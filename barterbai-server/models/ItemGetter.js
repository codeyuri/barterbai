const r = require("rethinkdb");
const item_getter_collections = r.table("item_getter");
const item_transaction_collections = r.table("item_transaction");

class ItemGetter {
  constructor(data) {
    this.data = data;
  }

  async getItem() {
    try {
      const add_item = await item_getter_collections
        .insert(this.data, { returnChanges: true })
        .run(connection);

      if (add_item.inserted) {
        return {
          success: true,
          message: "Item added successfully!",
          data: add_item.changes[0]["new_val"],
        };
      }
    } catch (e) {
      console.log(`\n@@@ getItem`, e);
      return { success: false, message: "Failed to add item!" };
    }
  }

  async addToTransaction(id) {
    try {
      const new_transaction = {
        item_setter: "777",
        item_getter: id,
        status: false,
        trade_success: false,
      };

      const add_transaction = await item_transaction_collections
        .insert(new_transaction)
        .run(connection);

      if (add_transaction.inserted) {
        return {
          success: true,
          message: "Get item added to transaction successfully!",
          data: new_transaction,
        };
      }
    } catch (e) {
      console.log(`\n@@@ addToTransaction`, e);
      return { success: false, message: "Failed to add to transaction!" };
    }
  }

  async cancelGetItem(id) {
    try {
      const delete_item = await item_getter_collections
        .get(id)
        .delete()
        .run(connection);

      if (delete_item.deleted) {
        return { success: true, message: "Get item canceled!" };
      } else {
        throw "Failed to cancel get item!";
      }
    } catch (e) {
      return { success: false, message: e };
    }
  }
}

module.exports = ItemGetter;
