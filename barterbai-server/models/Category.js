const r = require("rethinkdb");
const category_collections = r.table("item_category");

class Category {
  constructor(data) {
    this.data = data;
  }

  async addCategory(category) {
    try {
      const category_exists = await category_collections
        .getAll(category, { index: "category" })
        .coerceTo("array")
        .run(connection);

      if (category_exists.length >= 1) throw "Existing category!";

      const add_category = await category_collections
        .insert({ category }, { returnChanges: true })
        .run(connection);

      if (add_category.inserted) {
        return {
          success: true,
          message: "Category added successfully!",
          data: add_category.changes[0]["new_val"],
        };
      }
    } catch (e) {
      return { success: false, message: e };
    }
  }

  async deleteCategory(id) {
    try {
      const delete_category = await category_collections
        .get(id)
        .delete()
        .run(connection);

      if (delete_category.deleted) {
        return { success: true, message: "Category deleted successfully!" };
      } else {
        throw "Failed to delete category!";
      }
    } catch (e) {
      return { success: false, message: e };
    }
  }
}

module.exports = Category;
