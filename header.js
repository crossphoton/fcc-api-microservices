const express = require("express")
const app = express()

app.get("/api/whoami", (req, res)=> {
  console.log(req.headers['x-forwarded-for'])
  res.json({ipaddress: req.headers['x-forwarded-for'].split(',')[0], language: req.headers["accept-language"], software: req.headers["user-agent"]})
})

app.listen(8000, ()=> console.log("Server Up"));
