import type { EventHandlerRequest, H3Event } from "h3";
import type { JwtPayload } from "~~/shared/types";

export function defineAuthenticatedEventHandler<T>(
  handler: (
    event: H3Event<EventHandlerRequest>,
    user: JwtPayload,
  ) => T | Promise<T>,
) {
  return defineEventHandler((event): T | Promise<T> => {
    const token = Auth.getOrThrow(event);
    return handler(event, token);
  });
}
