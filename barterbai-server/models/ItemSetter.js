const r = require("rethinkdb");
const item_setter = r.table("item_setter");

class ItemSetter {
  constructor(data) {
    this.data = data;
  }

  async addItem(newitem) {
    try {
      const add_item = await item_setter
        .insert(newitem, { returnChanges: true })
        .run(connection);

      console.log(`@@@ addItem MODEL success`, add_item.changes[0]["new_val"]);

      if (add_item.inserted) {
        return {
          success: true,
          message: "Item added successfully!",
          data: add_item.changes[0]["new_val"],
        };
      }
    } catch (e) {
      console.log(`\n@@@ addItem MODEL failed`, e);
      throw e;
    }
  }

  async updateViewStatus(setter_id, status) {
    console.log("check again", setter_id, status);
    try {
      const update_priv_status = await item_setter
        .get(setter_id)
        .update({ is_private: status })
        .run(connection);

      if (update_priv_status.replaced) {
        return { success: true, message: "View status updated!" };
      } else {
        throw "Failed to update item status!";
      }
    } catch (e) {
      console.log(`updateViewStatus MODEL failed`, e);
      throw e;
    }
  }

  async deleteItem(id) {
    try {
      const delete_item = await item_setter.get(id).delete().run(connection);

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
