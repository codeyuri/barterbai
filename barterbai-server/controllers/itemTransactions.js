let ItemTransactions = require("../models/ItemTransactions");

// @route   GET /itemtransactions/
// @desc    Fetch all transactions
// @access  Public
exports.fetchTransactions = async (req, res) => {
  const transcations = new ItemTransactions();

  try {
    const fetch_transactions = await transcations.fetchTransactions(
      req.params.user_id
    );

    console.log(
      `\n@@@ fetchTransactions CONTROLLER success`,
      fetch_transactions
    );

    res.json(fetch_transactions);
  } catch (e) {
    console.log(`\n@@@ fetchTransactions CONTROLLER failed`, e);
    res.status(404).send({ success: false, message: e });
  }
};
