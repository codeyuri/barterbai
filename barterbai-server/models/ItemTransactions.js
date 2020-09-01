const r = require("rethinkdb");
const item_getter = r.table("item_getter");
const item_setter = r.table("item_setter");
const item_list = r.table("item_list");
const item_getter_list = r.table("item_getter_list");
const item_transaction = r.table("item_transaction");

class ItemTransactions {
  constructor(data) {
    this.data = data;
  }

  async addToTransaction(getter_id, setter_id, user_id) {
    try {
      const add_transaction = await item_transaction
        .insert(
          {
            user_id,
            getter_id,
            setter_id,
            is_pending: true,
            is_approved: false,
          },
          { returnChanges: true }
        )
        .run(connection);

      if (add_transaction.inserted) {
        return add_transaction.changes[0]["new_val"];
      }
    } catch (e) {
      console.log(`\n@@@ addToTransaction MODEL failed`, e);
      throw e;
    }
  }

  async fetchTransactions(user_id) {
    try {
      const fetch_transactions = await item_transaction
        .getAll(user_id, { index: "user_id" })
        .merge(function () {
          return {
            getter: item_getter
              .getAll(user_id, { index: "user_id" })
              .coerceTo("array")
              .merge(function () {
                return {
                  getter_list: item_getter_list
                    .getAll(user_id, {
                      index: "user_id",
                    })
                    .coerceTo("array"),
                };
              }),
            setter: item_setter
              .getAll(user_id, { index: "user_id" })
              .coerceTo("array")
              .merge(function () {
                return {
                  setter_list: item_list
                    .getAll(user_id, {
                      index: "user_id",
                    })
                    .coerceTo("array"),
                };
              }),
          };
        })
        .coerceTo("array")
        .run(connection);

      console.log(`\n@@@ fetchTransactions MODEL success`, fetch_transactions);
      return fetch_transactions;
    } catch (e) {
      console.log(`\n@@@ fetchTransactions MODEL failed`, e);
      throw e;
    }
  }

  //   async fetchTransactisssons(getter_id, setter_id) {
  //     try {
  //       const transactions = await item_transaction
  //         .get(add_transaction.changes[0]["new_val"].id)
  //         .merge(function () {
  //           return {
  //             getter: item_getter.get(getter_id).merge(function () {
  //               return {
  //                 getter_list: item_getter_list
  //                   .getAll(getter_id, {
  //                     index: "getter_id",
  //                   })
  //                   .coerceTo("array"),
  //               };
  //             }),
  //             setter: item_setter.get(setter_id).merge(function () {
  //               return {
  //                 setter_list: item_list
  //                   .getAll(setter_id, {
  //                     index: "setter_id",
  //                   })
  //                   .coerceTo("array"),
  //               };
  //             }),
  //           };
  //         })
  //         .run(connection);

  //       console.log(`\nfetchTransactions MODEL success`, transactions);

  //       return transactions.changes[0]["new_val"];
  //     } catch (e) {
  //       console.log(`\nfetchTransactions MODEL failed`, e);
  //       throw e;
  //     }
  //   }
}

module.exports = ItemTransactions;
