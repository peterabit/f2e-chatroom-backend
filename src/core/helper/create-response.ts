export function createResponse(message: string | number, data: object) {
  return JSON.stringify({
    message,
    ...data,
  })
}
