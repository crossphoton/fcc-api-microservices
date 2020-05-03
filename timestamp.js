const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Good, now head over to /api/timestamp");
});

app.get("/api/timestamp/:case", (req, res) => {
  let para = req.params.case;
  if (para.match(/^[0-9]+$/) && para.length >= 5) {
    let date = new Date(Number(para));
    res.json({ unix: Number(para), utc: date.toUTCString() });
    return;
  }

  let date = new Date(para);

  if (date.toString() === "Invalid Date") res.json({ error: "Invalid Date" });
  else res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

app.get("/api/timestamp/", (req, res) => {
  const date = new Date(Date.now());
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.listen(8000);
