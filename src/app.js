import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import store from "./store/index.js";
import router from "./routes/router.js";
import generalRouter from "./routes/general.router.js";

const { port, sync_interval, client_url } = config.app;

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
    // credentials: true,
  })
);
app.use(cookieParser());
app.use("/api", router);
app.use(generalRouter); // NotFound cases

// Checking any errors before listen.
app.use((err, req, res) => {
  res.status(500).send("Something broke!");
});

setInterval(store.sync, +sync_interval);
(async () => {
  try {
    // await connect();
    app.listen(port, () => console.log(`Run on ${port}`));
  } catch (err) {
    throw new Error(err);
  }
})();
