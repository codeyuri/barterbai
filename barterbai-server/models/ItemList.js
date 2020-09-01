const r = require("rethinkdb");
const item_list = r.table("item_list");

class ItemList {
  constructor(data) {
    this.data = data;
  }

  async fetchSingleItemList(setter_id) {
    try {
      const fetch_item = await item_list
        .getAll(setter_id, { index: "setter_id" })
        .eqJoin("setter_id", r.table("item_setter"))
        .without({ right: "id" })
        .zip()
        .coerceTo("array")
        .run(connection);

      // console.log(`fetchSingleItemList MODEL success`, fetch_item);

      if (fetch_item) {
        return fetch_item;
      } else {
        throw "cant fetch items";
      }
    } catch (e) {
      console.log(`fetchSingleItemList MODEL failed`, e);
      throw e;
    }
  }

  async fetchItemsByCategory(category, itemsearch) {
    try {
      if (!itemsearch) {
        const fetch_items = await item_list
          .getAll(category, { index: "category" })
          .eqJoin("setter_id", r.table("item_setter"))
          .without({ right: "id" })
          .zip()
          .filter({ is_private: false })
          .orderBy(r.desc("date_added"))
          .coerceTo("array")
          .run(connection);

        return fetch_items;
      } else {
        const fetch_items = await item_list
          .getAll(category, { index: "category" })
          .filter(function (doc) {
            return doc("item").match(itemsearch);
          })
          .eqJoin("setter_id", r.table("item_setter"))
          .without({ right: "id" })
          .zip()
          .filter({ is_private: false })
          .orderBy(r.desc("date_added"))
          .coerceTo("array")
          .run(connection);

        return fetch_items;
      }
    } catch (e) {
      console.log(`fetchItemsByCategory MODEL failed`, e);
      throw e;
    }
  }

  async fetchItemsByUser(user_id) {
    try {
      const fetch_items = await item_list
        .getAll(user_id, { index: "user_id" })
        .eqJoin("setter_id", r.table("item_setter"))
        .without({ right: ["id", "user_id"] })
        .zip()
        .orderBy(r.desc("date_added"))
        .coerceTo("array")
        .run(connection);

      // console.log(`fetchItemsByUser MODEL success`, fetch_items);
      if (fetch_items.length > 0) {
        return fetch_items;
      } else {
        throw "cant fetchItemsByUser";
      }
    } catch (e) {
      console.log(`fetchItemsByUser MODEL failed`, e);
      throw e;
    }
  }

  async fetchItemsByUserAndCategory(category, itemsearch, user_id) {
    try {
      if (!itemsearch) {
        const fetch_items = await item_list
          .getAll(user_id, { index: "user_id" })
          .filter(function (user) {
            return user("category").eq(category).default(false);
          })
          .eqJoin("setter_id", r.table("item_setter"))
          .without({ right: "id" })
          .zip()
          .orderBy(r.desc("date_added"))
          .coerceTo("array")
          .run(connection);

        return fetch_items;
      } else {
        const fetch_items = await item_list
          .getAll(user_id, { index: "user_id" })
          .filter(function (user) {
            return user("category")
              .eq(category)
              .default(false)
              .and(user("item").match(itemsearch));
          })
          // .filter(user_id)
          // .filter(function (doc) {
          //   return doc("item").match(itemsearch);
          // })
          .eqJoin("setter_id", r.table("item_setter"))
          .without({ right: "id" })
          .zip()
          .orderBy(r.desc("date_added"))
          .coerceTo("array")
          .run(connection);

        // console.log(`fetchItemsByUserAndCategory MODEL success`, fetch_items);
        return fetch_items;
      }
    } catch (e) {
      console.log(`fetchItemsByUserAndCategory MODEL failed`, e);
      throw e;
    }
  }

  async fetchItems() {
    try {
      const fetch_items = await item_list
        // .getAll(false, { index: "is_private" })
        .eqJoin("setter_id", r.table("item_setter"))
        .without({ right: "id" })
        .zip()
        .filter({ is_private: false })
        .orderBy(r.desc("date_added"))
        .coerceTo("array")
        .run(connection);

      // console.log(`fetchItems MODEL success`, fetch_items);
      if (fetch_items.length > 0) {
        return fetch_items;
      } else {
        throw "cant fetch Items";
      }
    } catch (e) {
      console.log(`fetchItems MODEL failed`, e);
      throw e;
    }
  }

  async addItemList(setter_id, item_container) {
    try {
      // i used map here to add each item with different categories
      // but has the same setter_id or 1 time nag set or sell with mutlple items
      // pero i think naa pay mas efficient way kaysa ani nga i one row lang unya i-array ang usa ka property pero naglisud ko ug kuha tungod sa structure sa ako output
      await item_container.map(async (itemlist) => {
        return await item_list
          .insert(
            {
              setter_id,
              category: itemlist.category,
              item: itemlist.item,
              user_id: itemlist.user_id,
            },
            { returnChanges: true }
          )
          .run(connection);
      });

      return {
        success: true,
        message: "Inserted items to database.",
      };
    } catch (e) {
      console.log(`additemList MODEL failed`, e);
      throw e;
    }
  }
}

module.exports = ItemList;
