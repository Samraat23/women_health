# Patient chat support

The chat button in the bottom-right corner of every public page books
appointments (in-clinic, video, audio), forwards patient inquiries, and lets
visitors explore the clinic's services. Admin routes don't show it.

## How it fits together

```
src/data/chat/            JSON the clinic can change (admin panel later)
  settings.json           copy, clinic details, consultation types, time slots, question order
  services.json           categories and services, each linked to a real page on the site
  intents.json            words and phrases the chat understands (English + Hinglish)

src/features/chat/
  core/                   runs in the browser and on the server
    engine.ts             the conversation, as a pure reducer
    prompts.ts            questions, suggestion chips, input box behaviour
    validation.ts         every field and whole-request check
    dates.ts              bookable dates and slots, in the clinic's time zone
  nlu/                    server only: what a typed message means
    rules.ts, entities.ts deterministic intent + entity extraction
    ai.ts                 optional Claude reading for messages the rules can't place
  server/                 server only
    config.ts             validates the JSON, adds service summaries from the articles
    requestStore.ts       saves requests (file or Firestore)
    clinicNotifier.ts     optional automatic WhatsApp message to the clinic
  ui/                     launcher, window, cards

src/app/api/chat/config       GET   settings + catalog for the browser
src/app/api/chat/understand   POST  reads a typed message
src/app/api/chat/requests     POST  validates, stores and hands off a confirmed request
src/app/admin/chat-requests   inbox of saved requests (admin login required)
```

The browser only ever collects answers. When a patient confirms, the server
re-validates the whole request, stores it, and builds the WhatsApp handoff.

## What the chat asks

- **Appointment / video / audio:** service, consultation type, preferred date,
  preferred time, patient name, age, mobile — in the order set in
  `settings.json → appointment.fieldOrder`. Anything already known is skipped.
- **Inquiry:** the question, name, mobile (`inquiry.fieldOrder`).
- Name, age and mobile are remembered for the rest of the visit (sessionStorage),
  so a second request never asks again. "Clear my details" in the chat menu wipes them.
- Everything is shown on a review card, editable, before anything is sent.

Service descriptions come from each article's intro (including admin edits in
Firestore), so the chat repeats the website rather than writing medical content.
Fees, which the site doesn't publish, are never quoted — the chat offers to send
the question to the clinic instead. Emergency wording shows 112 and the clinic's
number; self-harm wording shows Tele-MANAS (14416).

## Changing content

Edit the JSON and redeploy. The server validates it at startup and fails loudly
on a typo (unknown service ids, missing copy, bad slot hours).

- Time slots, closed weekdays (`0` = Sunday) and holiday dates: `settings.json → availability`.
- Add a service: add it to `services.json` with an `articleSlug` (or `href` +
  `summary`) and a few `keywords`, then optionally feature it in
  `settings.json → appointment.featuredServiceIds`.
- Teach the chat new phrasing: add phrases to `intents.json`.

## Storage

Requests are stored by the first driver that applies (force one with
`CHAT_STORAGE_DRIVER=file|firestore`):

| Driver | When | Notes |
| --- | --- | --- |
| `firestore` | `FIREBASE_SERVICE_ACCOUNT_KEY` (or `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY`) is set | Use on serverless hosting. Writes as the service account. |
| `file` | otherwise | JSON lines in `CHAT_DATA_DIR` (default `.data/chat`, git-ignored, owner-only permissions). Needs a persistent disk. |

Firestore collection: `CHAT_REQUESTS_COLLECTION` (default `chat_requests`), one
document per reference id. Because the server writes with a service account,
browsers need no access at all — keep patient data locked:

```
match /chat_requests/{id} {
  allow read, write: if false;
}
```

If storing fails, the patient still gets the WhatsApp handoff (the success card
then asks them to press Send) and the error is logged with the reference id only.

## WhatsApp

- **Always:** the success card has a "Send details on WhatsApp" button that opens a
  pre-filled message to the clinic (`settings.json → clinic.whatsAppNumber`). The
  patient presses Send, so the clinic can reply to them directly.
- **Optional, automatic:** set `WHATSAPP_CLOUD_API_TOKEN` and
  `WHATSAPP_PHONE_NUMBER_ID` to message the clinic from its WhatsApp Business
  number the moment a request arrives. Outside WhatsApp's 24-hour window this
  needs an approved template: set `WHATSAPP_TEMPLATE_NAME` (body variables in
  order: request type, reference, patient name, mobile, details) and
  `WHATSAPP_TEMPLATE_LANGUAGE`. `WHATSAPP_CLINIC_RECIPIENT` overrides the number
  notified; `WHATSAPP_GRAPH_API_VERSION` defaults to `v23.0`.

## AI understanding (optional)

Without configuration the rules engine handles typed messages. Set
`ANTHROPIC_API_KEY` to let Claude read messages the rules can't place
(`CHAT_AI_MODEL` defaults to `claude-opus-5`; `CHAT_AI_ENABLED=false` turns it
off). Claude only returns an intent and field values — never text shown to
patients — and every value is re-validated. Mobile numbers are removed before a
message is sent to the API; other message text is sent, so mention this in the
site's privacy policy if you enable it.

## Security

- Server-side validation of every field; unknown fields and services are dropped.
- Same-origin check, body size limits, a hidden honeypot field.
- Rate limits per IP (when the host sets `X-Forwarded-For`) and per mobile number.
  They are in memory, per server instance.
- The admin inbox sits behind the existing admin session.
