import express from "express";
import dotenv from "dotenv";
import router from "./routes/Routes";

dotenv.config();

const app = express();

// It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});

export default app;
