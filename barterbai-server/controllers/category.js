let Category = require("../models/Category");

// @route   POST /category/add
// @desc    Add a new item category
// @access  Public
exports.addCategory = async (req, res) => {
  const category = new Category();

  try {
    if (!req.body.category) throw "Category add failed, empty field!";

    const add_category = await category.addCategory(req.body.category);

    console.log(`\n@@@ addCategory`, add_category);
    res.json(add_category);
  } catch (e) {
    console.log(`\n@@@ addCategory`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};

// @route   DELETE /category/delete/:id
// @desc    Delete a category
// @access  Public
exports.deleteCategory = async (req, res) => {
  const category = new Category();

  try {
    const delete_category = await category.deleteCategory(req.params.id);

    console.log(`\n@@@ deleteCategory`, delete_category);
    res.json(delete_category);
  } catch (e) {
    console.log(`\n@@@ deleteCategory`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};
