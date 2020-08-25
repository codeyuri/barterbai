let ItemGetter = require("../models/ItemGetter");

// @route   POST /itemgetter/getitem
// @desc    Get/Buy item
// @access  Public
exports.getItem = async (req, res) => {
  const item = new ItemGetter(req.body);

  const { id, items_offered, note } = req.body;

  try {
    if (!items_offered || !note) throw "Get item failed, empty fields!";

    const get_item = await item.getItem();
    const add_to_transaction = await item.addToTransaction(get_item.data.id);

    console.log(
      `\n@@@ getItem`,
      get_item,
      `\n@@@ add_to_transaction`,
      add_to_transaction
    );
    res.json({ get_item, add_to_transaction });
  } catch (e) {
    console.log(`\n@@@ getItem`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};

// @route   DELETE /itemgetter/delete
// @desc    Cancel Get Item
// @access  Public
exports.cancelGetItem = async (req, res) => {
  const item = new ItemGetter();

  try {
    const delete_item = await item.cancelGetItem(req.params.id);

    console.log(`\n@@@ cancelGetItem`, delete_item);
    res.json(delete_item);
  } catch (e) {
    console.log(`\n@@@ cancelGetItem`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};
