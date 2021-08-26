import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
const Home = () => {
  const [twitter, setTwitter] = useState("");
  const [twitters, setTwitters] = useState([]);
  const gettwitters = async () => {
    const dbTwitters = await dbService.collection("twitters").get();
    dbTwitters.forEach((document) => {
      const twitterObject = {
        ...document.data(),
        id: document.id,
      };
      setTwitters((prev) => [twitterObject, ...prev]);
    });
  };

  useEffect(() => {
    gettwitters();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection("twitters").add({
      twitter,
      createId: Date.now(),
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
          <div>
            <h4>{twitter.twitter}</h4>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
