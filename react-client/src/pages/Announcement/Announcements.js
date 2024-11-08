// src/pages/Announcement/Announcements.js
import React, { useState, useEffect } from "react";
import AnnouncementDataService from "../../services/AnnouncementDataService";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    retrieveAnnouncements();
  }, []);

  const retrieveAnnouncements = () => {
    AnnouncementDataService.getAll()
      .then(response => setAnnouncements(response.data))
      .catch(e => console.log(e));
  };

  return (
    <div>
      <h4>공지사항 목록</h4>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>
            {announcement.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
