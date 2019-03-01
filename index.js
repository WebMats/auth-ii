const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const app = express();

const authRouter = require('./routes/auth');

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use('/authentication', authRouter)


app.listen(3200, () => {console.log('Listening on port 3200...')})