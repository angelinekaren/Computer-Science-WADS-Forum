fetch("./account.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
