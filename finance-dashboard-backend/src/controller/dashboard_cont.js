const Record = require("../models/records");

exports.getSummary = async (req, res) => {
  try {
    let match = {};

    
    if (req.user.role !== "admin") {
      match.user = req.user.id;
    }

    
    const income = await Record.aggregate([
      { $match: { ...match, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const expense = await Record.aggregate([
      { $match: { ...match, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    
    const category = await Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

   
    const categoryBreakdown = {};
    category.forEach(item => {
      categoryBreakdown[item._id] = item.total;
    });

    
    const recent = await Record.find(match)
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalIncome: income[0]?.total || 0,
      totalExpense: expense[0]?.total || 0,
      netBalance:
        (income[0]?.total || 0) - (expense[0]?.total || 0),
      categoryBreakdown,
      recentTransactions: recent
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};