# Article admin panel

Edit every blog article from `/admin/articles`.

## How content resolves

Articles have two layers:

1. **Seed** — `src/data/BlogData.ts`, compiled into the app. This is what ships
   in the repository and what the site falls back to.
2. **Override** — a Firestore document written by the admin panel.

`src/lib/articleStore.ts` reads the Firestore collection and lays any overrides
on top of the seed. If Firebase is unconfigured, unreachable, or its rules deny
the read, every page still renders from the seed. Nothing breaks.

Published pages revalidate every 60 seconds, so a save appears on the live page
within about a minute.

## Firestore shape

Collection: `NEXT_PUBLIC_FIREBASE_ARTICLES_COLLECTION` (default `whealth_articles`).
Document id: the article slug, e.g. `endometriosis-treatment`.

| Field         | Type      | Notes                                     |
| ------------- | --------- | ----------------------------------------- |
| `slug`        | string    | Same as the document id                   |
| `title`       | string    | Copied out for readability in the console |
| `category`    | string    | Category slug                             |
| `contentJson` | string    | The whole article as JSON                 |
| `updatedAt`   | timestamp | Server timestamp                          |

The article is stored as a JSON string rather than a nested map because
Firestore cannot hold an array inside an array, and article sections nest lists
(`cards[].items[]`).

## Required Firestore rules

The admin writes with the signed-in admin account; the public site reads through
the REST API with the web API key. Both need to be allowed:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /whealth_articles/{slug} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.token.email == 'drkusumlata@gmail.com'
                   && request.auth.token.email_verified == true;
    }
  }
}
```

Replace the email with `ADMIN_ALLOWED_EMAIL` if you change it. Without the read
rule the site silently keeps serving the seed, so edits will appear to do
nothing on the public pages.

## Reset

"Reset" deletes the Firestore document, so the article falls back to the seed in
`BlogData.ts`. It does not modify the repository.
