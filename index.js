const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// It parses incoming JSON requests and puts the parsed data in req.body 
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
