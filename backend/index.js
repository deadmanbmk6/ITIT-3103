import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import usersRouter from "./routes/usersRouter.js";
import operationsRouter from "./routes/operationsRouter.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());


connectDB();

const allowedDomains = [process.env.FRONTEND_URL_TOKEN];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
};

app.use("/", usersRouter);

app.use("/", operationsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Hello");
});
