import { NowRequest, NowResponse } from "@vercel/node";
var crypto = require("crypto");

function generateCodeVerifier() {
  return crypto.randomBytes(30).toString("hex");
}

export default (_: NowRequest, res: NowResponse) => {
  const c = generateCodeVerifier();
  res.end(c);
};
