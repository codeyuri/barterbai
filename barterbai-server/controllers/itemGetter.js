let ItemGetter = require("../models/ItemGetter");
const ItemTransactions = require("../models/ItemTransactions");

// @route   POST /itemgetter/getitem
// @desc    Get/Buy item
// @access  Public
// exports.getItem = async (req, res) => {
//   const item = new ItemGetter(req.body);

//   try {
//     if (!items_offered || !note) throw "Get item failed, empty fields!";

//     const get_item = await item.getItem();
//     const add_to_transaction = await item.addToTransaction(get_item.data.id);

//     console.log(
//       `\n@@@ getItem`,
//       get_item,
//       `\n@@@ add_to_transaction`,
//       add_to_transaction
//     );
//     res.json({ get_item, add_to_transaction });
//   } catch (e) {
//     console.log(`\n@@@ getItem`, { success: false, message: e });
//     res.json({ success: false, message: e });
//   }
// };

// @route   POST /itemgetter/getitem
// @desc    Get/Buy item
// @access  Public
exports.addGetter = async (req, res) => {
  const item = new ItemGetter();
  const item_transaction = new ItemTransactions();

  try {
    if (req.body.length <= 0) throw "Add offer failed, empty fields!";

    const get_item = await item.addGetter(req.body.add_this_to_getter);

    await item.addGetItemList(get_item.id, req.body.item_getter_container);

    const transactions = await item_transaction.addToTransaction(
      get_item.id,
      get_item.setter_id,
      get_item.user_id
    );

    // console.log(`addGetter transaction CONTROLLER success`, [
    //   transactions.setter.setter_list.map((show) => show),
    // ]);

    // const convertToArray = (data_reducer, itemlist) => {
    //   return [...data_reducer, ([itemlist.id] = item)];
    // };

    // const data_reducer = transactions.reduce(convertToArray, []);
    // console.log(`TEEEEEEEEEEEEEEEEEEEST`, data_reducer);

    // const groups = transactions.reduce((acc, d) => {
    //   if (Object.keys(acc).includes(d.setter_id)) return acc;

    //   acc[d.setter_id] = transactions.filter(
    //     (g) => g.setter_id === d.setter_id
    //   );
    //   return acc;
    // }, []);

    // const ArrOfTuples = Object.entries(transactions).map((tupleEntry) => {
    // console.log(`THIS IS TUPLE ENTRY`, tupleEntry);
    //   const [id, item] = tupleEntry;
    //   return item;
    // });

    // console.log(`CONTROLLLLLLER`, ArrOfTuples);

    res.json(transactions);
    // res.status(200).send({ success: true, message: "Added to getter list!" });
    // res.json({ success: true, message: "Added to getter list!" });
  } catch (e) {
    console.log(`\n@@@ addGetter CONTROLLER failed`, e);
    res.status(404).send({ success: false, message: e });
  }
};

// @route   DELETE /itemgetter/delete
// @desc    Cancel Get Item
// @access  Public
exports.cancelGetItem = async (req, res) => {
  const item = new ItemGetter();

  try {
    const delete_item = await item.cancelGetItem(req.params.id);

    console.log(`\n@@@ cancelGetItem`, delete_item);
    res.json(delete_item);
  } catch (e) {
    console.log(`\n@@@ cancelGetItem`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};
