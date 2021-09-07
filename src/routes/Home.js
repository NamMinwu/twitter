import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Twitter from "components/Twitter";
import TwitterFactory from "components/TwitterFactory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ userObj }) => {
  const [twitters, setTwitters] = useState([]);
  useEffect(() => {
    dbService.collection("twitters").onSnapshot((snapshot) => {
      const twitterArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwitters(twitterArray);
    });
  }, []);

  return (
    <div className="homeContainer">
      <TwitterFactory userObj={userObj} />
      <div>
        {twitters.map((twitter) => (
          <Twitter
            key={twitter.id}
            twitterObj={twitter}
            isOwner={twitter.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
