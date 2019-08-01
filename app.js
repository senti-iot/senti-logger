const express = require("express");
const app = express();
const logger = require("./currentImplementation/winstonLogger");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/logerror", (req, res) => {
  const message = req.body;
  logger.error(message);
  res.json({ response: "Error logged" });
});

app.post("/loginfo", (req, res) => {
  const message = req.body;
  logger.info(message);
  res.json({ response: "info logged successfully" });
});

app.listen(3004, () =>
  logger.info("The server started running @ " + Date(Date.now()))
);
