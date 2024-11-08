// src/pages/Announcement/AnnouncementDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnnouncementDataService from "../../services/AnnouncementDataService";

const AnnouncementDetail = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    AnnouncementDataService.get(id)
      .then(response => setAnnouncement(response.data))
      .catch(e => console.log(e));
  }, [id]);

  return (
    <div>
      <h4>공지사항 세부 정보</h4>
      {announcement && (
        <div>
          <h5>{announcement.title}</h5>
          <p>{announcement.content}</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementDetail;
