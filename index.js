const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
})

app.get('/', (req, res)=>{
    res.send('<h1>asdadsddasd</h1>')
});
