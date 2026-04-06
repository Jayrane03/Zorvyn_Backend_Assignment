const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/auth_cont");

router.post("/register", register);
router.post("/login", login);

module.exports = router;

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 5000
 *             type: income
 *             category: salary
 *             note: Monthly salary
 *     responses:
 *       201:
 *         description: Record created successfully
 *       403:
 *         description: Access denied
 */