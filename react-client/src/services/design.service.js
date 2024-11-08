import http from "../http-common";

class DesignDataService {
  // 설계서 - 작성 방법 및 예시
  getAll() {
    return http.get("/design");  // designs 경로로 변경
  }

  get(id) {
    return http.get(`/design/${id}`);
  }

  create(data) {
    return http.post("/design/register", data);
  }

  update(id, data) {
    return http.put(`/design/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/design/${id}`);
  }

  deleteAll() {
    return http.delete(`/design`);
  }
	findByTitle(title) {
    return http.get(`/design/submit?title=${title}`);
  }
  // 설계서 - 제출
  s_getAll() {
    return http.get("/design/submit");  // designs 경로로 변경
  }

  s_get(id) {
    return http.get(`/design/submit/${id}`);
  }

  s_create(data) {
    return http.post("/design/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/design/submit/register/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/design/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/design/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/design/submit?title=${title}`);
  }
}

export default new DesignDataService();