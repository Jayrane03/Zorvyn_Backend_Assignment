const app = require("./src/app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log(err));