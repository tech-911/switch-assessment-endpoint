const express = require("express");
const app = express();
const cors = require("cors");
const {
  createUpdateStorage,
  readStorage,
  createAccount,
  writeStorage,
} = require("./controller/user");

//Cross-Origin Resource Sharing (CORS) handler
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// console.log("readStorage: ", writeStorage(1234));
// console.log("readStorage: ", readStorage());
// console.log("createUpdateStorage: ", createUpdateStorage());

//--------Entry Route----------
app.get("/", (req, res) => {
  res.send({ message: "Welcome to test endpont" });
});

//--------Login Route----------

app.post("/auth", (req, res) => {
  const { userName, email, password } = req.body;
  if (userName === undefined || email === undefined || password === undefined) {
    return res.status(400).send({
      error: true,
      message: "Please provide all the details (userName, email and password)",
    });
  }

  const storedData = readStorage();

  // Check if the email already exists
  const existingAccount = storedData.find((account) => account.email === email);

  if (!existingAccount) {
    // If the email is new, create a new account object
    const newAccount = createAccount(userName, email, password);

    // Add the new account to the storage
    storedData.push(newAccount);
    writeStorage(storedData);
    return res.send({
      message: "Login successful",
      account: {
        id: newAccount?.id,
        userName,
        email,
      },
    });
  }
  res.send({
    message: "Login successful",
    account: {
      id: existingAccount?.id,
      userName,
      email,
    },
  });
});

//--------Bank Information Route----------

app.post("/bankAccount", (req, res) => {
  const { email, id } = req.body;
  const storedData = readStorage();
  if (!email || !id)
    return res.status(400).send({
      error: true,
      message: "Error in query. requires email and id",
    });
  const account = storedData.find(
    (account) => account.email === email && account.id === id
  );
  if (!account)
    res
      .status(400)
      .send({ error: true, message: "Account not found. Please Authenticate" });
  const { accountInfo, userName } = account;
  res.status(200).send({
    id,
    email,
    userName,
    accountInfo,
  });
});
//--------Bank Information Route End----------

const PORT = 3300; // Define the port

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT} use: http://localhost:${PORT}/`);
});
