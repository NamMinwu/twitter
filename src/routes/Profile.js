import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
const Profile = () => <span>Profile</span>;
export default () => {
  const history = useHistory();
  const onLogoutClick = () => {
    history.push("/");
    authService.signOut();
  };
  return (
    <>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};
