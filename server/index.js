const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth.js');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
app.use(cors());    //use Cross-Origin Resource Sharing
app.use(express.json());    //use json payloads to transfer data
app.use(express.urlencoded());    //use urlencoded payloads to transfer data

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authRouter); 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));