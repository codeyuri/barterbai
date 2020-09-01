import React from "react";
import { useDispatch } from "react-redux";

import "./modal.css";

import { updateViewStatus } from "../../../../../redux/store/items/itemsActions";

const ChangePublicStatus = ({ item, setModalPubStatus }) => {
  const dispatch = useDispatch();

  const { setter_id } = item[0];

  return (
    <div className="modal">
      <div className="modal_con publicstatus">
        <div className="modal_close" onClick={() => setModalPubStatus(false)}>
          <span>X</span>
        </div>
        <div className="modal_body">
          <h2>Item Privacy</h2>
          <p>Modify item's public status:</p>
          <br />
          <p>
            Current Status: <b>{item[0].is_private ? "Private" : "Public"}</b>
          </p>
          <div className="modal_text">
            <button
              onClick={() =>
                dispatch(updateViewStatus({ setter_id, status: true }))
              }
            >
              Set to Private
            </button>
            <button
              onClick={() =>
                dispatch(updateViewStatus({ setter_id, status: false }))
              }
            >
              Set to Public
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePublicStatus;
