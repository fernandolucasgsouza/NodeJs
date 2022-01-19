const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists)
    return response.status(400).json({ error: "customer already existent" });

  customers.push({
    id: uuid(),
    name,
    cpf,
    statement: [],
  });
  return response.status(201).send(customers);
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;
  const customer = customers.find((customer) => (customer.cpf = cpf));

  if (!customer) return response.status(404).json({ error: "customer not found" });

  return response.status(200).json(customer.statement);
});

app.put("/", (request, response) => {});
app.patch("/", (request, response) => {});
app.delete("/", (request, response) => {});

app.listen("3000");
