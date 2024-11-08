import http from "../http-common";

class AnnouncementDataService {
  getAll() {
    return http.get("/announcement"); // 공지사항 목록 가져오기
  }

  get(id) {
    return http.get(`/announcement/${id}`); // 특정 공지사항 가져오기
  }

  create(data) {
    return http.post("/announcement/add", data); // 공지사항 추가
  }

  update(id, data) {
    return http.put(`/announcement/edit/${id}`, data); // 공지사항 수정
  }

  delete(id) {
    return http.delete(`/announcement/${id}`); // 공지사항 삭제
  }
}

export default new AnnouncementDataService();