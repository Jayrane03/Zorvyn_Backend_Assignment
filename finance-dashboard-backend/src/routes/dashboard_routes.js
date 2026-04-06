const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddlerware");
const role = require("../middleware/roleMiddleware");

const { getSummary } = require("../controller/dashboard_cont");

router.get("/summary", auth, role("admin", "analyst", "viewer"), getSummary);

module.exports = router;

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary (income, expense, balance, category breakdown)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary data
 *       403:
 *         description: Access denied
 */