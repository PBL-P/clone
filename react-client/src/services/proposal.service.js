import http from "../http-common";

class ProposalDataService {
  // 작성 방법 관련 API
  getAll() {
    return http.get("/instructions");
  }

  get(id) {
    return http.get(`/instructions/${id}`);
  }

  create(data) {
    return http.post("/instructions", data);
  }

  update(id, data) {
    return http.put(`/instructions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/instructions/${id}`);
  }

  deleteAll() {
    return http.delete("/instructions");
  }

  findByTitle(title) {
    return http.get(`/instructions?title=${title}`);
  }

  // 제출 관련 API
  s_getAll() {
    return http.get("/submissions");
  }

  s_get(id) {
    return http.get(`/submissions/${id}`);
  }

  s_create(data) {
    return http.post("/submissions", data);
  }

  s_update(id, data) {
    return http.put(`/submissions/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/submissions/${id}`);
  }

  s_deleteAll() {
    return http.delete("/submissions");
  }

  s_findByTitle(title) {
    return http.get(`/submissions?title=${title}`);
  }
}

export default new ProposalDataService();