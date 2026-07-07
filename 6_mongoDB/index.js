const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");


const app = express();
const PORT = 8000;

// Connnection
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Mongo error", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    },
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

// Middleware -> plugin
app.use(express.urlencoded({ extended: false}));

app.use((req, res, next) => {
  //console.log("Hello from middleware 1");
  fs.appendFile("log.txt", `\n${Date.now()}: ${req.ip} ${req.method} ${req.path}\n`, (err, data) => {
    next();
  })
});
app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

// Routes
app.get("/users", async(req, res) => {
   const allDbUsers = await User.find({});
   const html = `
   <ul>
      ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
   </ul>
   `;
   res.send(html);
});

// REST API
app.get("/api/users", async(req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});
app.post("/api/users", async(req, res) => {
    // create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.job_title){
      return res.status(400).json({ msg: "All fields are req..."});
    }
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });
    return res.status(201).json({msg: "success"});
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "User not found"});
    return res.json(user);
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
    return res.json({status: "Success"});
  })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
  });

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))