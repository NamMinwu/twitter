import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = () => {
    history.push("/");
    authService.signOut();
  };
  const getMyTwitters = async () => {
    const twitters = await dbService
      .collection("twitters")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  useEffect(() => {
    getMyTwitters();
  }, []);

  return (
    <div className="profileContainer">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          className="profileInput"
        />
        <input type="submit" value="Update Profile" className="profileSubmit" />
      </form>
      <button onClick={onLogoutClick} className="profileBtn">
        Log Out
      </button>
    </div>
  );
};
