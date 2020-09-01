import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getCategories } from "../../../../redux/store/category/categoryActions";
import {
  fetchItems,
  fetchItemsByCategory,
} from "../../../../redux/store/items/itemsActions";

import ItemList from "./items/ItemList";

const HomeContent = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item);
  const category = useSelector((state) => state.category);

  const [state, setState] = useState({
    category_holder: "Appliances",
    item_search: "",
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(fetchItems());
  }, []);

  const handleSelect = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    dispatch(fetchItemsByCategory(state));
  };

  return (
    <>
      <h2>Home</h2>
      <div className="main_top">
        <Link to="/additem">
          <button>Post Item</button>
        </Link>
        <div className="search_div">
          <input
            type="text"
            onChange={(e) =>
              setState({ ...state, item_search: e.target.value })
            }
            value={state.item_search}
            placeholder="search item..."
          />
          <select
            name="category_holder"
            onChange={handleSelect}
            value={state.category_holder}
          >
            <optgroup label="Select category">
              {category.item_categories.length > 0 ? (
                category.item_categories.map((categ) => {
                  return (
                    <option key={categ.id} value={categ.category}>
                      {categ.category}
                    </option>
                  );
                })
              ) : (
                <option>{category.message}</option>
              )}
            </optgroup>
          </select>
        </div>
        <div className="search_div">
          <button onClick={handleSearch}>Search</button>
          <button onClick={() => dispatch(fetchItems())}>Get All</button>
        </div>
      </div>
      <ItemList item={item.items} />
    </>
  );
};

export default HomeContent;
