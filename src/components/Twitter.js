import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Twitter = ({ twitterObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTwitter, setNewTwitter] = useState(twitterObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this twitter?");
    if (ok) {
      await dbService.doc(`twitters/${twitterObj.id}`).delete();
      await storageService.refFromURL(twitterObj.attachmentUrl).delete();
    }
  };

  const toggleEdit = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`twitters/${twitterObj.id}`).update({
      text: newTwitter,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTwitter(value);
  };
  return (
    <div className="twitter">
      {editing ? (
        <div className="twitterEdit">
          <form onSubmit={onSubmit} className="twitterEditContainer">
            <input
              type="text"
              placeholder="Edit your twitter"
              value={newTwitter}
              onChange={onChange}
              required
              className="twitterEditInput"
            />
            <input
              type="submit"
              value="Update Twitter"
              className="twitterEditSubmit"
            />
          </form>
          <button onClick={toggleEdit} className="twitterEditBtn">
            Cancel
          </button>
        </div>
      ) : (
        <div className="twitterList">
          <h4>{twitterObj.text}</h4>
          <div>
            {twitterObj.attachmentUrl && (
              <img
                src={twitterObj.attachmentUrl}
                width="60px"
                height="60px"
                style={{
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
          {isOwner && (
            <div className="twitterIsOwner">
              <button onClick={onDeleteClick} style={{ marginRight: "10px" }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Twitter;
