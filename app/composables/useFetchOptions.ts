export function useFetchOptions() {
  const config = useRuntimeConfig();

  return { baseURL: config.public.baseURL };
}
