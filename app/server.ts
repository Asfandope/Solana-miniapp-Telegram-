import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import user from "./routes/api/user";
import wallet from "./routes/api/wallet";
import friend from "./routes/api/friend";
import earnings from "./routes/api/earnings";
import connectDB from "./lib/dbConnect";
const app: Express = express();
const port: Number = process.env.PORT ? Number(process.env.PORT) : 5000;

const path = require("path");

connectDB();
app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/static", express.static(__dirname + "./dist"));

app.use("/api/user", user);
app.use("/api/wallet", wallet);
app.use("/api/friend", friend);
app.use("/api/earnings", earnings);
app.get("/api/get-suv-version", (req, res) => {
  res.send(
    JSON.stringify({
      version: "1.0.0",
      file: "suv-1.0.0.zip",
      update_at: "2023-06-14",
    })
  );
});

// if (process.env.ENVIRONMENT === "PRODUCTION") {
console.log("Production requested");
app.use(
  express.static(
    path.join(__dirname, "./../../Erne-Legacy-Telegram-App-Frontend/dist")
  )
);

app.get("/*", async (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "./../../Erne-Legacy-Telegram-App-Frontend/dist",
      "index.html"
    )
  );
});
// }

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
