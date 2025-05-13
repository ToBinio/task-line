export function useLoginToken() {
  const runtimeConfig = useRuntimeConfig();

  return useCookie<string | undefined>("token", {
    maxAge: parseInt(runtimeConfig.public.jwtTTL),
    sameSite: true,
  });
}
