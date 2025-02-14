const fs = require("fs");
const path = require("path");

// Path to the storage file
const storagePath = path.join(__dirname, "storage.json");

// Function to read the storage file
function readStorage() {
  const data = fs.readFileSync(storagePath, "utf-8");
  return JSON.parse(data);
}

// Function to write to the storage file
function writeStorage(data) {
  fs.writeFileSync(storagePath, JSON.stringify(data, null, 2), "utf-8");
}

// Function to generate a random 4-digit number
function generateRandom4Digit() {
  return Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999
}

// Function to generate a unique 4-digit number
function createUpdateStorage() {
  let existingNumbers = readStorage();
  let newNumber;

  do {
    newNumber = generateRandom4Digit();
  } while (existingNumbers.includes(newNumber)); // Check if the number already exists

  // Add the new number to the array and save it
  existingNumbers.push(newNumber);
  writeStorage(existingNumbers);

  return newNumber;
}

// Function to generate a random number within a range
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random 16-digit account number
function generateAccountNumber() {
  return (
    generateRandomNumber(1000, 9999).toString() +
    generateRandomNumber(1000, 9999).toString() +
    generateRandomNumber(1000, 9999).toString() +
    generateRandomNumber(1000, 9999).toString()
  );
}

// Function to create a new account object
function createAccount(userName, email, password) {
  return {
    id: generateRandomNumber(1000, 9999), // Random 4-digit ID
    accountInfo: [
      {
        accountType: Math.random() < 0.5 ? "current" : "savings", // Randomly assign "current" or "savings"
        accountDescription: "regular", // Fixed value
        accountNumber: generateAccountNumber(), // Random 16-digit account number
        accountBalance: generateRandomNumber(1000, 1000000), // Random balance between 1000 and 1,000,000
      },
      {
        accountType: Math.random() < 0.5 ? "current" : "savings", // Randomly assign "current" or "savings"
        accountDescription: "regular", // Fixed value
        accountNumber: generateAccountNumber(), // Random 16-digit account number
        accountBalance: generateRandomNumber(1000, 1000000), // Random balance between 1000 and 1,000,000
      },
    ],
    userName: userName,
    password: password,
    email: email, // User's email
  };
}

module.exports = {
  createUpdateStorage,
  generateRandom4Digit,
  writeStorage,
  readStorage,
  storagePath,
  generateRandomNumber,
  generateAccountNumber,
  createAccount,
};
