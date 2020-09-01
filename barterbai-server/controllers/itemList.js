let ItemList = require("../models/ItemList");

// @route   GET /itemlist/
// @desc    Fetch all items
// @access  Public
exports.fetchItems = async (req, res) => {
  const itemlist = new ItemList();

  try {
    const fetch_items = await itemlist.fetchItems();

    // const convertToArray = (data_reducer, item) => {
    //   return {
    //     ...data_reducer,
    //     [item.id]: item,
    //   };
    // };

    // const data_reducer = fetch_items.reduce(convertToArray, []);
    // console.log(`TEEEEEEEEEEEEEEEEEEEST`, data_reducer);

    // console.log(`fetch_items CONTROLLER`, fetch_items);

    const groups = fetch_items.reduce((acc, d) => {
      if (Object.keys(acc).includes(d.setter_id)) return acc;

      acc[d.setter_id] = fetch_items.filter((g) => g.setter_id === d.setter_id);
      return acc;
    }, {});

    const ArrOfTuples = Object.entries(groups).map((tupleEntry) => {
      const [id, object] = tupleEntry;
      return object;
    });

    // console.log(`groups groupsgroupsgroups `, groups);
    // console.log(`ArrOfTuples ArrOfTuples `, ArrOfTuples);

    res.json(ArrOfTuples);
  } catch (e) {
    console.log(`fetchItems CONTROLLER failed`, e);
    res.status(404).send({ success: false, message: e });
  }
};

// @route   POST /itemlist/
// @desc    Fetch all items by category and/or item name
// @access  Public
exports.fetchItemsByCategory = async (req, res) => {
  const itemlist = new ItemList();

  // console.log(`CHECKKKK`, req.body);
  try {
    const fetch_items = await itemlist.fetchItemsByCategory(
      req.body.category_holder,
      req.body.item_search
    );

    // console.log(`fetchItemsByCategory CONTROLLER success`, fetch_items);

    const groups = fetch_items.reduce((acc, d) => {
      console.log(`reduce fetch items by setter id`, acc);
      if (Object.keys(acc).includes(d.setter_id)) return acc;

      acc[d.setter_id] = fetch_items.filter((g) => g.setter_id === d.setter_id);
      return acc;
    }, {});

    const ArrOfTuples = Object.entries(groups).map((tupleEntry) => {
      const [id, object] = tupleEntry;
      return object;
    });

    // console.log(`fetchItemsByCategory CONTROLLER success`, ArrOfTuples);

    res.json(ArrOfTuples);
  } catch (e) {
    console.log(`fetchItemsByCategory CONTROLLER failed`, e);
    res.status(404).send({ success: false, message: e });
  }
};

// @route   GET /itemlist/:setter_id
// @desc    Fetch single item
// @access  Public
exports.fetchSingleItemList = async (req, res) => {
  const itemlist = new ItemList();

  try {
    const fetch_item = await itemlist.fetchSingleItemList(req.params.setter_id);

    // console.log(`fetchSingleItemList CONTROLLER success`, fetch_item);

    res.json(fetch_item);
  } catch (e) {
    console.log(`fetchSingleItemList CONTROLLER failed`, e);
    res.status(404).send({ success: false, message: e });
  }
};

// @route   GET /itemlist/user/:username
// @desc    Fetch single item
// @access  Public
exports.fetchItemsByUser = async (req, res) => {
  const itemlist = new ItemList();

  try {
    const fetch_items = await itemlist.fetchItemsByUser(req.params.user_id);

    // console.log(`fetchItemsByUser CONTROLLER success`, fetch_items);

    const groups = fetch_items.reduce((acc, d) => {
      if (Object.keys(acc).includes(d.setter_id)) return acc;

      acc[d.setter_id] = fetch_items.filter((g) => g.setter_id === d.setter_id);
      return acc;
    }, {});

    const ArrOfTuples = Object.entries(groups).map((tupleEntry) => {
      const [id, object] = tupleEntry;
      return object;
    });

    res.json(ArrOfTuples);
  } catch (e) {
    console.log(`fetchItemsByUser CONTROLLER failed`, e);
    res.status(404).send({ success: false, message: e });
  }
};

// @route   POST /itemlist/
// @desc    Fetch all items by category and/or item name
// @access  Public
exports.fetchItemsByUserAndCategory = async (req, res) => {
  const itemlist = new ItemList();

  // console.log(`CHECKKKK`, req.body);
  try {
    const fetch_items = await itemlist.fetchItemsByUserAndCategory(
      req.body.category_holder,
      req.body.item_search,
      req.body.user_id
    );

    // console.log(`fetchItemsByUserAndCategory CONTROLLER success`, fetch_items);

    const groups = fetch_items.reduce((acc, d) => {
      console.log(`reduce fetch items by setter id`, acc);
      if (Object.keys(acc).includes(d.setter_id)) return acc;

      acc[d.setter_id] = fetch_items.filter((g) => g.setter_id === d.setter_id);
      return acc;
    }, {});

    const ArrOfTuples = Object.entries(groups).map((tupleEntry) => {
      const [id, object] = tupleEntry;
      return object;
    });

    // console.log(`fetchItemsByUserAndCategory CONTROLLER success`, ArrOfTuples);

    res.json(ArrOfTuples);
  } catch (e) {
    console.log(`fetchItemsByUserAndCategory CONTROLLER failed`, e);
    res.status(404).send({ success: false, message: e });
  }
};
