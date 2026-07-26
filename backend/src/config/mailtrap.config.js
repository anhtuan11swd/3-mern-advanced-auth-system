import "dotenv/config";
import { MailtrapClient } from "mailtrap";

const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "MERN Auth",
};

export { mailtrapClient, sender };
