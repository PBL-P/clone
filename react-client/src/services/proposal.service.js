import http from "../http-common";

class ProposalDataService {
  // 제안서 - 작성 방법 및 예시
  getAll() {
    return http.get("/proposal");  // proposals 경로로 변경
  }

  get(id) {
    return http.get(`/proposal/${id}`);
  }

  create(data) {
    return http.post("/proposal/register", data);
  }

  update(id, data) {
    return http.put(`/proposal/${id}`, data);
  }

  delete(id) {
    return http.delete(`/proposal/${id}`);
  }

  deleteAll() {
    return http.delete(`/proposal`);
  }

  
  // 제안서 - 제출
  s_findByTitle(title) {
    return http.get(`/proposal/submit?title=${title}`);
  }
  s_getAll() {
    return http.get("/proposal/submit");  // proposals 경로로 변경
  }

  s_get(id) {
    return http.get(`/proposal/submit/${id}`);
  }

  s_create(data) {
    return http.post("/proposal/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/proposal/submit/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/proposal/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/proposal/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/proposal/submit?title=${title}`);
  }
}

export default new ProposalDataService();