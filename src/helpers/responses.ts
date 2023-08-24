export const apiBadRequestError = () => ({
  statusCode: 400,
  isBase64Encoded: false,
});

export const apiOk = <T>(body: T) => ({
  statusCode: 200,
  isBase64Encoded: false,
  body: JSON.stringify(body),
});
