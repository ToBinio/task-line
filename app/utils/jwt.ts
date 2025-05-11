export function decodeJwt(
  token: string,
): { sub: string; email: string; picture: string } | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload!));
  } catch (e) {
    console.error(e);
    return null;
  }
}
