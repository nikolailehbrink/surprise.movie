export function NotFound(
  message: BodyInit,
  init?: Omit<ResponseInit, "status">,
) {
  return new Response(message, { ...init, status: 404 });
}
