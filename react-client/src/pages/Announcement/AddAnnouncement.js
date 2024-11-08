// src/pages/Announcement/AddAnnouncement.js
import React, { useState } from "react";
import AnnouncementDataService from "../../services/AnnouncementDataService";

const AddAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const saveAnnouncement = () => {
    const data = { title, content };
    AnnouncementDataService.create(data)
      .then(response => {
        setTitle("");
        setContent("");
        console.log(response.data);
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <h4>공지사항 추가</h4>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={saveAnnouncement}>저장</button>
    </div>
  );
};

export default AddAnnouncement;
