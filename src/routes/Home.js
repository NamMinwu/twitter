import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Twitter from "components/Twitter";
import { v4 as uuidv4 } from "uuid";
const Home = ({ userObj }) => {
  const [twitter, setTwitter] = useState("");
  const [twitters, setTwitters] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection("twitters").onSnapshot((snapshot) => {
      const twitterArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwitters(twitterArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, "data_url");
    console.log(response);
    // dbService.collection("twitters").add({
    //   text: twitter,
    //   createId: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setTwitter("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwitter(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
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
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input type="submit" value="Twitter" />
          {attachment && (
            <div>
              <img scr={attachment} width="50px" height="50px" />
              <button onClick={onClearAttachment}>Clear</button>
            </div>
          )}
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
