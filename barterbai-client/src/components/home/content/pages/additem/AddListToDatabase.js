import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { addItemAction } from "../../../../../redux/store/items/itemsActions";

const AddListToDatabase = (props) => {
  const {
    user: { user_id, username },
    item_container,
    wishlist_holder,
    set_as_private,
    error,
    setError,
    // setState,
  } = props;

  const dispatch = useDispatch();

  const handleAddItemList = async () => {
    try {
      if (item_container.length < 1) {
        setError({ ...error, category_name_holder: true, item_holder: true });
        return false;
      }

      if (!wishlist_holder) {
        setError({ ...error, wishlist_holder: true });
        return false;
      }

      const add_this_to_setter = {
        user_id,
        username,
        wishlist_holder,
        is_private: set_as_private,
        date_added: new Date().toISOString(),
      };

      await dispatch(addItemAction([item_container, add_this_to_setter]));
      // await setState({ item_container: [] });
      setError({ ...error, wishlist: false });

      props.history.push("/items");
    } catch (e) {
      console.log(`handleAddItemList failed`, e);
    }
  };

  return (
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
        {item_container.length > 0 ? (
          item_container.map((item, index) => {
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
      <button onClick={handleAddItemList}>Add to Barter</button>
    </div>
  );
};

export default withRouter(AddListToDatabase);
