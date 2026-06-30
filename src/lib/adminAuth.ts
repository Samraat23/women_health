export const adminSessionCookieName = "whealth_admin_session";
export const adminSessionMaxAge = 60 * 60 * 8;

export type AdminAuthConfig = {
  email: string;
  password: string;
  sessionSecret: string;
};

export function getAdminAuthConfig(): AdminAuthConfig | null {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!email || !password || !sessionSecret) {
    return null;
  }

  return {
    email,
    password,
    sessionSecret,
  };
}

export function isAdminSessionValid(sessionValue?: string | null) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  return Boolean(sessionSecret && sessionValue === sessionSecret);
}
