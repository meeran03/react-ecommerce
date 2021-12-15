
const URL = "http://localhost:3001";

export async function updateProduct(id, obj) {
  fetch(URL + "/items/" + id, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json())
    .then((json) => {
        console.log(json)
    });
}
