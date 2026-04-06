const { body } = require("express-validator");

exports.recordValidator = [
  body("amount").isNumeric().withMessage("Amount must be number"),
  body("type").isIn(["income", "expense"]),
  body("category").notEmpty().withMessage("Category required")
];