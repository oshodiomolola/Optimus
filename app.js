const express = require('express');
require("dotenv").config();
const { connectToDatabase } = require("./config");
const userRoute = require("./Routes/usersRoute");
const taskRoute = require("./Routes/taskRoute");
const appError = require("./utils/errorHandler");
const errorHandler = require('./controllers/errorController');

const PORT = process.env.PORT;

const app = express();
connectToDatabase();
console.log(connectToDatabase)

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/users", userRoute)

// app.use('/api/v1', userRoute);
// app.use('/api/v1', taskRoute);

app.all('*', (req, res, next) => {
  next(new appError('page not found', 404))
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})