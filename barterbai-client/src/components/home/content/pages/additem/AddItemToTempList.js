import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCategories } from "../../../../../redux/store/category/categoryActions";

import Wishlist from "./Wishlist";
import AddListToDatabase from "./AddListToDatabase";

const AddItemToTempList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const category = useSelector((state) => state.category);

  const [state, setState] = useState({
    category_name_holder: "",
    item_holder: "",
    wishlist_holder: "",
    set_as_private: false,
    item_container: [],
  });

  const [error, setError] = useState({
    category_name_holder: false,
    item_holder: false,
    wishlist_holder: false,
    next: false,
  });

  // const [isDisabled, setIsDisabled] = useState(false);

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
        setError({ ...error, category_name_holder: true, item_holder: true });
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
        item_container: [
          ...state.item_container,
          {
            category: category_name_holder,
            item: item_holder,
            user_id: user.user_id,
          },
        ],

        category_name_holder: "",
        item_holder: "",
        // wishlist_holder: "",
        set_as_private: false,
      });

      setError({ ...error, next: true });
    } catch (e) {
      console.log(e);
    }
  };

  // const handleDisable = () => {
  //   if (state.item_container.length < 0) {
  //     return false;
  //   }
  //   setIsDisabled(!isDisabled);
  // };

  return (
    <>
      <h2>Add Item</h2>
      <div className="main_btm others">
        <div className="add_div_1">
          <label htmlFor="category_name_holder">Select Category</label>
          <select
            name="category_name_holder"
            onChange={handleChange}
            value={state.category_name_holder}
            className={error.category_name_holder ? "style_error" : null}
            // disabled={isDisabled}
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
            // disabled={isDisabled}
            className={error.item_holder ? "style_error" : null}
          />
          <button
            onClick={handleAddItem}
            // disabled={isDisabled}
            // className={isDisabled ? "is_disabled" : null}
          >
            Add Item
          </button>
          {/* {error.next ? (
            <p onClick={handleDisable}>{isDisabled ? "Back" : "Next"}</p>
          ) : null} */}

          {error.item_holder || error.category_name_holder ? (
            <span className="spanerror additem">
              Please select a category and input an item!
            </span>
          ) : (
            error.wishlist_holder && (
              <span className="spanerror additem">
                Don't forget your wishlist!
              </span>
            )
          )}
        </div>
        <Wishlist
          handleChange={handleChange}
          wishlist={state.wishlist_holder}
          set_as_private={state.set_as_private}
          wishlist_error={error.wishlist_holder}
          state={state}
          setState={setState}
        />
        <AddListToDatabase
          user={user}
          item_container={state.item_container}
          wishlist_holder={state.wishlist_holder}
          set_as_private={state.set_as_private}
          error={error}
          setError={setError}
        />
        {/*<div className="add_div_3">
          <p>Upload an Image</p>
          <div className="sample_img">Preview Sample</div>
          <button>Upload Image</button>
        </div> */}
      </div>
    </>
  );
};

export default AddItemToTempList;
