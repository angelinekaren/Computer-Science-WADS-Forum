const express = require("express");
const app = express();

// Session & Cookie Parser Middleware
const session = require("express-session");

// dateTime
const TEN_SECONDS = 1000 * 10;

// process.env: global variable for runtime usage
const { PORT = 3000, SESS_LIFETIME = TEN_SECONDS } = process.env;

// create a session middleware
app.use(
  session({
    secret: "thisissecret1f89247", // used for signing cookies
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: SESS_LIFETIME,
    },
  })
);

// parse incoming request object as a JSON object
app.use(express.json());
// only parse incoming request object if strings or arrays
app.use(express.urlencoded({ extended: false }));

// static middleware: handles serving up the content from a directory
app.use(express.static(__dirname));

// set authentication credentials
const users = [
  {
    id: 1,
    name: "angeline",
    email: "angeline@gmail.com",
    password: "shiroiscute",
  },
  {
    id: 2,
    name: "shannon",
    email: "shannon@gmail.com",
    password: "shannonsecretpass",
  },
  {
    id: 3,
    name: "sieren",
    email: "sieren@gmail.com",
    password: "sierensecretpass",
  },
];

// variable to store a session
var sess;

// Session
app.get("/", (req, res) => {
  const { userId } = req.session;
  // find user in the users array
  const user = users.find((user) => user.email === userId);

  // if exist
  if (user) {
    res.send(`
            <h1>Welcome, ${user.name}!</h1>
            <a href="/logout">Log out</a>
        `);
  } else {
    res.sendFile("views/index.html", { root: __dirname });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    // find user in the users array (the incoming req email and password have to matched with what existed in the array)
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    // if matched
    if (user) {
      sess = req.session;
      // set email address as userId
      sess.userId = user.email;

      // print out session data
      console.log(req.session);

      res.send(`
            <h1>Hello, ${user.name}!</h1>
            <a href="/">Go back</a>
            <a href="/logout">Log out</a>
        `);
    } else {
      res.send("Invalid email or password");
    }
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
