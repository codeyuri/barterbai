import React from "react";

import "./wishlist.css";

const Wishlist = ({
  handleChange,
  set_as_private,
  wishlist,
  wishlist_error,
  state,
  setState,
}) => {
  return (
    <div className="add_div_1">
      <p>Set As Private</p>
      <label className="switch">
        <input
          type="checkbox"
          name="set_as_private"
          value={set_as_private}
          onChange={() =>
            setState({ ...state, set_as_private: !set_as_private })
          }
        />
        <span className="slider"></span>
      </label>
      <label htmlFor="item_holder">Wishlist</label>
      <textarea
        name="wishlist_holder"
        placeholder="Add a wishlist after finalizing all items to be added..."
        onChange={handleChange}
        value={wishlist}
        className={wishlist_error ? "style_error" : null}
      />
    </div>
  );
};

export default Wishlist;
