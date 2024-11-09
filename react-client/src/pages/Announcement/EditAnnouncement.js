// src/pages/Announcement/EditAnnouncement.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnnouncementDataService from "../../services/AnnouncementDataService";

const EditAnnouncement = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    AnnouncementDataService.get(id)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(e => console.log(e));
  }, [id]);

  const updateAnnouncement = () => {
    const data = { title, content };
    AnnouncementDataService.update(id, data)
      .then(response => console.log(response.data))
      .catch(e => console.log(e));
  };

  return (
    <div>
      <h4>공지사항 수정</h4>
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
      <button onClick={updateAnnouncement}>수정</button>
    </div>
  );
};

export default EditAnnouncement;
