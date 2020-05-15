const express = require("express");
const app = express();
const cors = require("cors");

var arr = [];

var users = [];

class record {
  constructor(userId, description, date, duration) {
    this.userId = userId;
    this.description = description;
    this.date = new Date(date);
    this.duration = duration;
  }
}

app.use(cors());
app.use(express.json());

app.post("/api/exercise/new-user", (req, res) => {
  if (!req.body.username) return res.send("Username is required").status(401);
  if (!(users.indexOf(req.body.username) > -1)) {
    users.push(req.body.username);
    return res.status(200).json({
      username: req.body.username,
      _id: String(users.indexOf(req.body.username)),
    });
  }
  res.send("username already exist");
});

app.post("/api/exercise/add", (req, res) => {
  id = Number(req.body.userId);
  if (-1 > id >= users.length) return res.send("User not there");
  date = new Date(req.body.date);
  description = req.body.description;
  duration = req.body.duration;
  var data = new record(id, description, date, duration);
  arr.push(data);
  res.json({
    username: users[id],
    description: description,
    duration: duration,
    _id: id,
    date: date,
  });
});

app.get("/api/exercise/log", (req, res) => {
  var user = {
    userId: Number(req.query.userId),
    from: new Date(req.query.from),
    to: new Date(req.query.to),
    limit: Number(req.query.limit),
  };
  if (user.from > user.to) return res.send("Invalid request");
  if (-1 > user.userId >= users.length) return res.send("User not there");
  function filterFunc(record) {
    var result = 1;
    if (!(record.userId == user.userId)) result = 0;
    if (!(user.from < record.date)) result = 0;
    if (!(user.to > record.date)) result = 0;
    return result;
  }
  const data = arr.filter(filterFunc);
  if (data.length > user.limit) while (data.length != user.limit) data.pop();
  res.json({
    _id: user.userId,
    username: users[user.userId],
    from: user.from,
    to: user.to,
    count: user.limit,
    log: data,
  });
});

app.listen(8000, () => console.log("Server Up"));

// { userId: '1', from: '2015-02-03', to: '2015-06-03', limit: '1' }
