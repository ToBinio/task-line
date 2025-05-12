import { decodeJwt } from "@/utils/jwt";
import { useLoginToken } from "./useLoginToken";

export function useLoginImageUrl() {
  const token = useLoginToken();

  return computed(() => {
    if (!token.value) return undefined;

    const payload = decodeJwt(token.value);
    return payload?.picture;
  });
}
