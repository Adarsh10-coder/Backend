const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
app.get("/users", (req, res) => {
   const html = `
   <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
   </ul>
   `;
   res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
    res.setHeader('X-MyName', 'Adarsh'); // custom header
    // always add X to custom header
    return res.json(users);
});
app.post("/api/users", (req, res) => {
    // create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.job_title){
      return res.status(400).json({ msg: "All fields are req..."});
    }
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.status(201).json({status: "success", id: users.length});
    })
});
// app.get("/api/users/:id", (req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    // return res.json(user);
// });
// app.patch("/api/users/:id", (req, res) => {
//     return res.json({status: "Pending"});
// });
// app.delete("/api/users/:id", (req, res) => {
//    return res.json({status: "Pending"});
// });

//+++++++++++ better method +++++++
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({error: "User not found"});
    return res.json(user);
  })
  .patch((req, res) => {
    // edit user with id
    return res.json({status: "Pending"});
  })
  .delete((req, res) => {
    // delete user with id
    return res.json({status: "Pending"});
  });

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))