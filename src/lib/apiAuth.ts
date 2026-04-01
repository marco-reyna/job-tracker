export function verifyApiAuth(request: Request): boolean {
  const auth = request.headers.get("Authorization");
  return auth === `Bearer ${process.env.AUTH_SECRET}`;
}
