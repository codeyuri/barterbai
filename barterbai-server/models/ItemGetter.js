const r = require("rethinkdb");
const item_getter = r.table("item_getter");
const item_getter_list = r.table("item_getter_list");

class ItemGetter {
  constructor(data) {
    this.data = data;
  }

  async addGetter(newgetter) {
    try {
      const add_item = await item_getter
        .insert(newgetter, { returnChanges: true })
        .run(connection);

      if (add_item.inserted) {
        return add_item.changes[0]["new_val"];
      }
    } catch (e) {
      console.log(`\n@@@ addGetter MODEL failed`, e);
      throw e;
    }
  }

  async addGetItemList(getter_id, item_getter_container) {
    try {
      // i used map here to add each item with different categories
      // but has the same getter_id or 1 time nag set or sell with mutlple items
      // pero i think naa pay mas efficient way kaysa ani nga i one row lang unya i-array ang usa ka property pero naglisud ko ug kuha tungod sa structure sa ako output
      await item_getter_container.map(async (itemlist) => {
        return await item_getter_list
          .insert(
            {
              getter_id,
              category: itemlist.category,
              offered_items: itemlist.item,
              user_id: itemlist.user_id,
            },
            { returnChanges: true }
          )
          .run(connection);
      });

      return {
        success: true,
        message: "Inserted offered items to database.",
      };
    } catch (e) {
      console.log(`addGetItemList MODEL failed`, e);
      throw e;
    }
  }

  async cancelGetItem(id) {
    try {
      const delete_item = await item_getter.get(id).delete().run(connection);

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
