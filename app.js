const express = require('express');
require("dotenv").config();
const { connectToDatabase } = require("./config");
const userRoute = require("./Routes/usersRoute");

const PORT = process.env.PORT;

const app = express();
connectToDatabase();

app.use(express.json());
app.use("/users", userRoute)


app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})