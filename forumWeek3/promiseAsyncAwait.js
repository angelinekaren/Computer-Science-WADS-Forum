// Promise
// an object that return the result of an asynchronous operation either resolved or rejected

function welcome() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Welcome to Night Owl's Bank!");
    }, 100);
  });
}

function isRegisteredUser(username, password) {
  return new Promise((resolve, reject) => {
    if (username == "angelinekaren" && password == "kar123") {
      setTimeout(() => {
        resolve(`Welcome ${username}!`);
      }, 1000);
    } else reject("You are not authenticated to log in!");
  });
}

// Async: ensures a function returns a promise
// Await: only work inside async function and is used to paused the execution until promise resolved
async function login() {
  try {
    const res = await welcome();
    console.log(res);

    const isAuthenticated = await isRegisteredUser("angelinekaren", "kar123");
    console.log(isAuthenticated);
  } catch (error) {
    console.log(error);
  }
}

login();
