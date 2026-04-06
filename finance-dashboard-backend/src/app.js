const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth_routes");
const recordRoutes = require("./routes/record_routes");
const app = express();
const dashboardRoutes = require("./routes/dashboard_routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/records", recordRoutes);
module.exports = app;