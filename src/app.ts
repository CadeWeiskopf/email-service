import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { REQUEST_ORIGIN, SERVICE_PORT } from "./data/env-vars";
import { sendEmail } from "./email";
import { isEmailData } from "./data/shared-types/types";

const app = express();

// 2 per minute
const limiter = rateLimit({
  limit: 2,
});

app.use(limiter);
app.use(express.json());
app.use(
  cors({
    allowedHeaders: "Content-Type",
    methods: "POST",
    origin: REQUEST_ORIGIN,
  })
);

app.post("/email", (req, res) => {
  if (!isEmailData(req.body)) {
    console.error(`${JSON.stringify(req.body)} is not IEmailData`);
    res.send({ error: "Data is not correctly formatted, check inputs." });
    return;
  }

  sendEmail(req.body);

  res.send({ data: "Email has been sent!" });
});

app.listen(SERVICE_PORT, () => {
  console.log(`listening on port ${SERVICE_PORT}`);
});
