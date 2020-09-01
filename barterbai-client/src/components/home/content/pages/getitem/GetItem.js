import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, withRouter } from "react-router-dom";

import "./getitem.css";

import { getCategories } from "../../../../../redux/store/category/categoryActions";
import { addOfferItemsAction } from "../../../../../redux/store/items/itemsActions";

const GetItem = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const category = useSelector((state) => state.category);
  const location = useLocation();

  const [state, setState] = useState({
    category_name_holder: "",
    item_holder: "",
    note_holder: "",
    item_getter_container: [],
  });

  const [error, setError] = useState({
    category_name_holder: false,
    item_holder: false,
    note_holder: false,
    next: false,
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false });
  };

  const handleAddItem = () => {
    const { category_name_holder, item_holder } = state;

    try {
      if (!category_name_holder && !item_holder) {
        setError({ ...error, select: true, item_holder: true });
        return false;
      }

      if (!category_name_holder) {
        setError({ ...error, category_name_holder: true });
        return false;
      }

      if (!item_holder) {
        setError({ ...error, item_holder: true });
        return false;
      }

      setState({
        item_getter_container: [
          ...state.item_getter_container,
          {
            category: category_name_holder,
            item: item_holder,
            user_id: user.user_id,
          },
        ],

        category_name_holder: "",
        item_holder: "",
        note_holder: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSendOffer = async () => {
    try {
      if (state.item_getter_container.length < 1) {
        setError({ ...error, category_name_holder: true, item_holder: true });
        return false;
      }

      if (!state.note_holder) {
        setError({ ...error, note_holder: true });
        return false;
      }

      const add_this_to_getter = {
        user_id: user.user_id,
        username: user.username,
        setter_id: location.state.get_item[0].setter_id,
        note: state.note_holder,
        date_added: new Date().toISOString(),
      };

      await dispatch(
        addOfferItemsAction([state.item_getter_container, add_this_to_getter])
      );

      setError({ ...error, note_holder: false });

      props.history.push("/transactions/pending");
    } catch (e) {
      console.log(`handleSendOffer failed`, e);
    }
  };

  return (
    <>
      <h2>Get Item</h2>
      <div className="main_btm others get_item">
        <div className="add_div_2 the_item">
          <h3>The Item</h3>
          <ul>
            <li>
              <span>
                <i>
                  <strong style={{ color: "#f77c7c" }}>Seller:</strong>
                  {" " + location.state.get_item[0].username}
                </i>
              </span>
            </li>
            <li>
              <span>
                <strong>Category</strong>
              </span>
              <span>
                <strong>Item</strong>
              </span>
            </li>
            {location.state.get_item.length > 0 ? (
              location.state.get_item.map((item, index) => {
                return (
                  <li key={index}>
                    <span>{item.category}</span>
                    <span>{item.item}</span>
                  </li>
                );
              })
            ) : (
              <li>Ooooops, please add something!</li>
            )}
            <li>
              <span>
                <i>
                  <strong style={{ color: "#f77c7c" }}>Wishlist:</strong>
                  {" " + location.state.get_item[0].wishlist_holder}
                </i>
              </span>
            </li>
          </ul>
        </div>
        <div className="get_item_right">
          <h3>Your Offer</h3>
          <div className="get_item_top">
            <div className="add_div_1">
              <label htmlFor="category_name_holder">Select Category</label>
              <select
                name="category_name_holder"
                onChange={handleChange}
                value={state.category_name_holder}
                className={error.category_name_holder ? "style_error" : null}
              >
                <option>Select Category</option>
                {category.item_categories.length > 0 ? (
                  category.item_categories.map((item) => {
                    return (
                      <option key={item.id} value={item.category}>
                        {item.category}
                      </option>
                    );
                  })
                ) : (
                  <option>{category.message}</option>
                )}
              </select>
              <label htmlFor="item_holder">Input Item</label>
              <input
                type="text"
                name="item_holder"
                placeholder="Add item here..."
                onChange={handleChange}
                value={state.item_holder}
                className={error.item_holder ? "style_error" : null}
              />
              <button onClick={handleAddItem}>Add Item</button>
              {error.item_holder || error.category_name_holder ? (
                <span className="spanerror additem">
                  Please select a category and input an item!
                </span>
              ) : (
                error.note_holder && (
                  <span className="spanerror additem">
                    Say something nice to the trader below!
                  </span>
                )
              )}
            </div>
            <div className="add_div_2">
              <p>Item List</p>
              <ul>
                <li>
                  <span>
                    <strong>Category</strong>
                  </span>
                  <span>
                    <strong>Item</strong>
                  </span>
                </li>
                {state.item_getter_container.length > 0 ? (
                  state.item_getter_container.map((item, index) => {
                    return (
                      <li key={index}>
                        <span>{item.category}</span>
                        <span>{item.item}</span>
                      </li>
                    );
                  })
                ) : (
                  <li>Ooooops, please add something!</li>
                )}
              </ul>
            </div>
          </div>
          <div className="note">
            <textarea
              name="note_holder"
              placeholder="Add a note to the trader after finalizing all items to be added..."
              value={state.note_holder}
              onChange={handleChange}
            />
            <button onClick={handleSendOffer}>Send Offer</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(GetItem);
