const express = require("express");

const app = express();
app.use(express.json());

app.get("/courses", (request, response) => {
  const { query } = request;
  console.log("queryParamns:", query);

  return response.json([
    { name: "course 1" },
    { name: "course 2" },
    { name: "course 3" },
  ]);
});

app.post("/courses", (request, response) => {
  const { body } = request;

  console.log("bodyParams", body);

  return response.json([
    { name: "course 1" },
    { name: "course 2" },
    { name: "course 3" },
    { name: "course 4" },
  ]);
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log("param id:", id);

  return response.json([
    { name: "course 5" },
    { name: "course 2" },
    { name: "course 3" },
    { name: "course 4" },
  ]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json([
    { name: "course 5" },
    { name: "course 2" },
    { name: "course 3" },
    { name: "course 6" },
  ]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json([
    { name: "course 5" },
    { name: "course 7" },
    { name: "course 6" },
  ]);
});

app.listen(3000);
