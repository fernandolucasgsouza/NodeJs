const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

function verifyExistAccountCPF(request, response, next) {
  // Middlware
  const { cpf } = request.headers;
  const customer = customers.find((customer) => (customer.cpf = cpf));

  if (!customer)
    return response.status(404).json({ error: "customer not found" });

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    return operation.type === "credit"
      ? acc + operation.amount
      : acc - operation.amount;
  }, 0);

  return balance;
}

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

app.get("/statement", verifyExistAccountCPF, (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer.statement);
});

app.post("/deposit", verifyExistAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOpetation = {
    description,
    amount,
    createdAt: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOpetation);

  return response.status(201).send(customer.statement);
});

app.post("/withdraw", verifyExistAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);
  console.log("balance", balance);

  if (!balance && amount > balance) {
    return response.status(400).json({ message: "Insuficient funds!" });
  }

  const statementOpetation = {
    amount,
    createdAt: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOpetation);

  return response.status(201).send(statementOpetation);
});


app.listen("3000");
