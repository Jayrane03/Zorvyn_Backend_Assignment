const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddlerware");
const role = require("../middleware/roleMiddleware");

const validate = require("../middleware/validate");
const { recordValidator } = require("../utils/validator");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controller/record_cont");


router.post(
  "/",
  auth,
  role("admin"),
  recordValidator,
  validate,
  createRecord
);
router.put(
  "/:id",
  auth,
  role("admin"),
  updateRecord
);
router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteRecord
);
router.get(
  "/",
  auth,
  role("admin", "analyst"),
  getRecords
);

module.exports = router;

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get financial records with filters and pagination
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: income or expense
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of records
 *       403:
 *         description: Access denied
 */
/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record updated
 */
/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted
 */