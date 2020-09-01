import React from "react";
import { Link } from "react-router-dom";

import "./modal.css";

const GetItemModal = ({ item, setModalGetItem }) => {
  //   console.log(item); // mo loop kadaghan ni base sa gi map, ako lang nya ni ifix
  //  ako pag kuha sa item ani kay dili direct from gi map, gi paagi pa nakong useLocation nga props kay dili nako makuha sa direct ra
  return (
    <div className="modal">
      <div className="modal_con">
        <div className="modal_close" onClick={() => setModalGetItem(false)}>
          <span>X</span>
        </div>
        <div className="modal_body">
          <h2>Get this item</h2>
          <div className="modal_text">
            <table className="newbox_con">
              <thead>
                <tr>
                  <th>Seller</th>
                  <td>{item[0].username}</td>
                </tr>
                <tr>
                  <th>Wishlist</th>
                  <td>{item[0].wishlist_holder}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <th>Item List</th>
                </tr>
              </thead>
              <tbody>
                {item.map((subitem, index) => {
                  return (
                    <tr key={index}>
                      <td>{subitem.category}</td>
                      <td>{subitem.item}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Link
              to={{
                pathname: `/getitem`,
                state: { get_item: item },
              }}
            >
              <button>Get Item</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetItemModal;
