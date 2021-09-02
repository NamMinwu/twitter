import { dbService, storageService } from "fbase";
import React, { useState } from "react";

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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your twitter"
              value={newTwitter}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Twitter" />
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{twitterObj.text}</h4>
          {twitterObj.attachmentUrl && (
            <img src={twitterObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Twitter</button>
              <button onClick={toggleEdit}>Edit Twitter</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Twitter;
