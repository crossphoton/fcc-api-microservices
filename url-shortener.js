const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

var arr = ["https://www.google.com/"];

var count = 1;

app.get("/", (req, res) => {
  res.send("Good, now head over to /api/timestamp");
});

app.post("/api/shorturl/new/:url", (res, req)=> {
  dns.lookup(req.params.url, (err)=> {
    if (err) return res.status(401).json({error: "Invalid url"});
  })
  res.json({original_url: req.params.url, short_url: count});
  count += 1;
  arr.push(req.params.url)
})

app.get("/api/shorturl/:url", (req, res)=> {
  if(count < Number(req.params.url)) return res.status(404).json({error: "Not registered"})
  res.redirect(arr[Number(req.params.url)])
})

app.listen(8000, ()=> console.log("Server Up"));
