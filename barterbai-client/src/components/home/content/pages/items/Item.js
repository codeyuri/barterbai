import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, Link } from "react-router-dom";
// tried useLocation to get the props from the ItemList component
// to fetch the specific item without connecting to the database
// but when i manually searched the link with the id params in it,
// the props is not defined since it was pass thru the Link
// from the ItemList compoennt

import "./items.css";

import { fetchSingleItemList } from "../../../../../redux/store/items/itemsActions";

const Item = () => {
  // const state = useLocation();
  const setter_id = useParams();
  const user = useSelector((state) => state.user);
  const item = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleItemList(setter_id));
  }, []);

  return (
    <>
      <h2>Item View</h2>
      <div className="main_btm others">
        <div className="item_view">
          <div className="item_view_img">Sample Image</div>
          <ul className="item_view_data">
            <li>
              <div className="divgroup">
                <div>
                  <strong>Seller:</strong>
                  <div>
                    {item.current_item.length > 0 &&
                      item.current_item[0].username}
                  </div>
                </div>
                <div>
                  <Link to="/">
                    <button>Go Back</button>
                  </Link>
                  {item.current_item.length > 0 &&
                    item.current_item[0].username !== user.username && (
                      <Link
                        to="/getitem"
                        to={{
                          pathname: `/getitem`,
                          state: { get_item: item.current_item },
                        }}
                      >
                        <button>Get this Item</button>
                      </Link>
                    )}
                </div>
              </div>
            </li>
            <li>
              <table className="newbox_con">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Item List</th>
                  </tr>
                </thead>
                <tbody>
                  {item.current_item.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.category}</td>
                        <td>{data.item}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Item;
