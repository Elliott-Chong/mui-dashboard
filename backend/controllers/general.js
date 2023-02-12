import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    // Recent Transactions
    const recentTransactions = await Transaction.find({})
      .limit(50)
      .sort({ createdOn: -1 });

    // Overall Stats
    const overallStats = await OverallStat.findOne({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStats;

    const thisMonthStats = overallStats.monthlyData.find(
      ({ month }) => month === currentMonth
    );
    const todayStats = overallStats.dailyData.find(
      ({ date }) => date === currentDay
    );

    return res.status(200).json({
      recentTransactions,
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
};
