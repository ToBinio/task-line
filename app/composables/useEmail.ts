import { decodeJwt } from "@/utils/jwt";

export function useEmail() {
  const token = useLocalStorage<string | null>("token", null);

  return computed(() => {
    if (!token.value) return null;

    const payload = decodeJwt(token.value);

    return payload?.email;
  });
}
