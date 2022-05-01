const express = require("express");
const app = express();

// Cookie Parser Middleware
const cookieParser = require("cookie-parser");

// dateTime
const FOUR_HOURS = 1000 * 60 * 60 * 4;

// process.env: global variable for runtime usage
const { PORT = 3000, COOKIE_LIFETIME = FOUR_HOURS } = process.env;

// use cookie parser middleware to parse cookies attached in client's request obj
app.use(cookieParser("thisismycookiesecret"));

// Cookie
app.get("/", (req, res) => {
  if (req.cookies.isUser) {
    res.send(`
        <h1>Welcome again, ${req.cookies["isUser"]}!</h1>
        <p>Cookie will expire in 4 hours or <a href="/deleteCookie">Delete cookie</a>
        <a href="/">Reload page</a>
      `);
    console.log(req.cookies);
  }
  // create cookie when user visit the website for the first time
  else
    res.cookie("isUser", "angeline", { maxAge: COOKIE_LIFETIME }).send(`
          <h1>Cookies created! Welcome to your first time visit:)</h1>
          <a href="/">Reload page</a>
          `);
});

app.get("/deleteCookie", (req, res) => {
  // delete cookie
  res.clearCookie("isUser");
  res.send(`
      <h1>Cookie is deleted</h1>
      <a href="/">Go back to main</a>
    `);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
