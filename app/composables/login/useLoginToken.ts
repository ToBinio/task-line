export function useLoginToken() {
  return useCookie<string | undefined>("token", {
    maxAge: 60 * 60,
    sameSite: true,
  });
}
