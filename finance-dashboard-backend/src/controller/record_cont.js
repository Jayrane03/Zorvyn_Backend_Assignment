const Record = require("../models/records");

exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    const record = await Record.create({
      user: req.user.id,
      amount,
      type,
      category,
      date,
      note
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (req.user.role !== "admin") {
      filter.user = req.user.id;
    }

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const skip = (page - 1) * limit;

    const records = await Record.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: records
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // 🔐 Only admin OR owner can update
    if (
      req.user.role !== "admin" &&
      record.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await Record.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // 🔐 Only admin OR owner
    if (
      req.user.role !== "admin" &&
      record.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Record.findByIdAndDelete(id);

    res.json({ message: "Record deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};