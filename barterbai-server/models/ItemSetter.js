const r = require("rethinkdb");
const item_setter_collections = r.table("item_setter");

class ItemSetter {
  constructor(data) {
    this.data = data;
  }

  async addItem() {
    try {
      const add_item = await item_setter_collections
        .insert(this.data)
        .run(connection);

      if (add_item.inserted) {
        return {
          success: true,
          message: "Item added successfully!",
          data: this.data,
        };
      }
    } catch (e) {
      console.log(`\n@@@ addItem`, e);
      return { success: false, message: "Failed to add item!" };
    }
  }

  async deleteItem(id) {
    try {
      const delete_item = await item_setter_collections
        .get(id)
        .delete()
        .run(connection);

      if (delete_item.deleted) {
        return { success: true, message: "Item deleted successfully!" };
      } else {
        throw "Failed to delete item!";
      }
    } catch (e) {
      return { success: false, message: e };
    }
  }
}

module.exports = ItemSetter;
