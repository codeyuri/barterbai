let ItemSetter = require("../models/ItemSetter");
let ItemList = require("../models/ItemList");

// @route   POST /itemsetter/add
// @desc    Add a new item
// @access  Public
exports.addItem = async (req, res) => {
  const item = new ItemSetter();
  const item_list = new ItemList();

  // console.log(`ADD ITEM REQ BODY`, req.body);

  try {
    if (req.body.length <= 0) throw "Add item failed, empty fields!";

    const add_item = await item.addItem(req.body.add_this_to_setter);

    console.log(`\n@@@ addItem controller`, add_item.data);

    const add_item_list = await item_list.addItemList(
      add_item.data.id,
      req.body.item_container
    );

    console.log(`add_item_list inside itemSetter controller`, add_item_list);

    res.json(add_item_list);
  } catch (e) {
    console.log(`\n@@@ addItem controller`, e);
    res.status(404).send({ success: false, message: e });
  }
};

// @route   UPDATE /itemsetter/status
// @desc    Update public status of an item
// @access  Public
exports.updateViewStatus = async (req, res) => {
  const item = new ItemSetter();

  console.log(`check this`, req.body);

  try {
    const update_priv_status = await item.updateViewStatus(
      req.body.setter_id,
      req.body.status
    );

    res.json(update_priv_status);
  } catch (e) {
    console.log(`\n@@@ updateViewStatus CONTROLLER failed`, e);
    res.status(404).send({ success: false, message: e });
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
