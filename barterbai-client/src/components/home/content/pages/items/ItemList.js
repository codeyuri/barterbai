import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import GetItemModal from "../getitem/GetItemModal";
import ChangePublicStatus from "../getitem/ChangePublicStatus";

const ItemList = ({ item }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const [modalGetItem, setModalGetItem] = useState(false);
  const [modalPubStatus, setModalPubStatus] = useState(false);

  return (
    <div className="main_btm home">
      {item.length > 0 ? (
        item.map((itemm, index) => (
          <div key={index} className="newbox">
            {modalGetItem && (
              <GetItemModal
                item={location.state.current_item}
                setModalGetItem={setModalGetItem}
              />
            )}
            {modalPubStatus && (
              <ChangePublicStatus
                item={location.state.current_item}
                setModalPubStatus={setModalPubStatus}
              />
            )}

            <div className="item_btn">
              <Link
                to={{
                  pathname: `/view/${itemm[0].setter_id}`,
                  state: { current_item: itemm },
                }}
              >
                <span className="view_icon"></span>
              </Link>
              {itemm[0].username !== user.username && (
                <Link
                  to={{
                    // pathname: `/`,
                    state: { current_item: itemm },
                  }}
                >
                  <span
                    style={{ fontSize: "33px", padding: 0 }}
                    onClick={() => setModalGetItem(true)}
                    className="get_icon"
                  >
                    +
                  </span>
                </Link>
              )}
              {itemm[0].username === user.username && (
                <Link
                  to={{
                    // pathname: `/`,
                    state: { current_item: itemm },
                  }}
                >
                  <span
                    style={{ fontSize: "33px", padding: 0 }}
                    onClick={() => setModalPubStatus(true)}
                    className="privacy_icon"
                  ></span>
                </Link>
              )}
            </div>
            <div className="div_titles">
              <b>Seller</b>: {itemm[0].username}
            </div>
            <div className="div_titles">
              <b>Wishlist</b>: {itemm[0].wishlist_holder}
            </div>
            <table className="newbox_con">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Item List</th>
                </tr>
              </thead>
              <tbody>
                {itemm.map((subitem, index) => {
                  return (
                    <tr key={index}>
                      <td>{subitem.category}</td>
                      <td>{subitem.item}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No item(s) found!</p>
      )}
    </div>
  );
};

export default ItemList;
