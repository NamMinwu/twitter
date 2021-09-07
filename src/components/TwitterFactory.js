import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TwitterFactory = ({ userObj }) => {
  const [twitter, setTwitter] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const twitterObj = {
      text: twitter,
      createId: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("twitters").add(twitterObj);
    setTwitter("");
    setAttachment("");
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
  const onClearAttachment = () => setAttachment("");
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryMessage">
        <input
          type="text"
          placeholder="make your message"
          value={twitter}
          onChange={onChange}
          maxLength={120}
          className="factoryInput"
        />
        <input type="submit" value="&rarr;" className="factorySubmit" />
      </div>
      <div className="factoryFile">
        <label for="factoryInputFile">
          <span className="factoryInputFile_span">Add photos</span>
          <FontAwesomeIcon
            icon={faPlus}
            style={{ color: "#04aaff", cursor: "pointer" }}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          id="factoryInputFile"
          style={{ opacity: 0 }}
        />
        {attachment && (
          <div className="factoryAttachment">
            <img scr={attachment} style={{ backgroundImage: attachment }} />
            <div
              onClick={onClearAttachment}
              className="factoryAttachmentRemove"
            >
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default TwitterFactory;
