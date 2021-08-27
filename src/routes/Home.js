import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Twitter from "components/Twitter";
const Home = ({ userObj }) => {
  console.log(userObj);
  const [twitter, setTwitter] = useState("");
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

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection("twitters").add({
      text: twitter,
      createId: Date.now(),
      creatorId: userObj.uid,
    });
    setTwitter("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwitter(value);
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="make your message"
            value={twitter}
            onChange={onChange}
            maxLength={120}
          />
          <input type="submit" value="Twitter" />
        </form>
      </div>
      <div>
        {twitters.map((twitter) => (
          <Twitter
            key={twitter.id}
            twitterObj={twitter}
            isOwner={twitter.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};
export default Home;
