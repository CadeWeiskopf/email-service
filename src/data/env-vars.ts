const SERVICE_PORT = process.env.SERVICE_PORT;
if (!SERVICE_PORT) {
  throw Error("no env var SERVICE_PORT");
}
const REQUEST_ORIGIN = process.env.REQUEST_ORIGIN;
if (!REQUEST_ORIGIN) {
  throw Error("no env var REQUEST_ORIGIN");
}
const EMAIL_TO = process.env.EMAIL_TO;
if (!EMAIL_TO) {
  throw Error("no env var EMAIL_TO");
}
const EMAIL_ID = process.env.EMAIL_ID;
if (!EMAIL_ID) {
  throw Error("no env var EMAIL_ID");
}
const EMAIL_SECRET = process.env.EMAIL_SECRET;
if (!EMAIL_SECRET) {
  throw Error("no env var EMAIL_SECRET");
}
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
if (!EMAIL_SERVICE) {
  throw Error("no env var EMAIL_SERVICE");
}
export {
  SERVICE_PORT,
  REQUEST_ORIGIN,
  EMAIL_TO,
  EMAIL_ID,
  EMAIL_SECRET,
  EMAIL_SERVICE,
};
