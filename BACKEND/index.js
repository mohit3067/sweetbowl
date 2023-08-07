const connectToMongo = require("./db");
const express = require("express"); //npm module for CRUD opretion
const app = express();
var cors = require("cors");
app.use(express.json()); //this is importent for sending jseon file to db
app.use(cors());
const port = 3030;
connectToMongo();
//defrent routes for endpoints
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`app listning at http://localhost:${port}`);
});
