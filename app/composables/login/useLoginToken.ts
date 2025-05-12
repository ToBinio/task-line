export function useLoginToken() {
  return useLocalStorage<string | undefined>("token", undefined);
}
