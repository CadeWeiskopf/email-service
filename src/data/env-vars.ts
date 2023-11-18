const EMAIL_ID = process.env.EMAIL_ID;
if (!EMAIL_ID) {
  throw Error("no env var EMAIL_ID");
}
const EMAIL_SECRET = process.env.EMAIL_SECRET;
if (!EMAIL_SECRET) {
  throw Error("no env var EMAIL_SECRET");
}
export { EMAIL_ID, EMAIL_SECRET };
