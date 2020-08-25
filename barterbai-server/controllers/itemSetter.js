let ItemSetter = require("../models/ItemSetter");

// @route   POST /itemsetter/add
// @desc    Add a new item
// @access  Public
exports.addItem = async (req, res) => {
  const item = new ItemSetter(req.body);

  const { item_list, wishlist } = req.body;

  try {
    if (!item_list || !wishlist) throw "Add item failed, empty fields!";

    const add_item = await item.addItem();

    console.log(`\n@@@ addItem`, add_item);
    res.json(add_item);
  } catch (e) {
    console.log(`\n@@@ addItem`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};

// @route   DELETE /itemsetter/delete
// @desc    Delete an item
// @access  Public
exports.deleteItem = async (req, res) => {
  const item = new ItemSetter();

  try {
    const delete_item = await item.deleteItem(req.params.id);

    console.log(`\n@@@ deleteItem`, delete_item);
    res.json(delete_item);
  } catch (e) {
    console.log(`\n@@@ deleteItem`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};
