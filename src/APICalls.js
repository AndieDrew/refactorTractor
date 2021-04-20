export const getData = () => {
  let userData = fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())
    .then(userData => {
      return userData;
    })
    .catch(err => console.log("error received"));

  let ingredientsData = fetch("http://localhost:3001/api/v1/ingredients")
    .then(response => response.json())
    .then(ingredientsData => {
      return ingredientsData;
    })
    .catch(err => console.log("error received"));

  let recipeData = fetch("http://localhost:3001/api/v1/recipes")
    .then(response => response.json())
    .then(recipeData => {
      return recipeData;
    })
    .catch(err => console.log("recipeData error received"));

  return Promise.all([userData, ingredientsData, recipeData])
    .then(data => {
      let allData = {};
      allData.userData = data[0];
      allData.ingredientsData = data[1];
      allData.recipeData = data[2];
      return allData;
    })
}

export const postData = (data) => {
  fetch("http://localhost:3001/api/v1/users", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log("you fucked up", err));
}
