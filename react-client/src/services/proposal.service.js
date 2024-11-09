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

    return http.get("/instruction/proposal");  // proposals 경로로 변경
  }

  get(id) {
    return http.get(`/instruction/proposal/${id}`);
  }

  create(data) {
    return http.post("/instruction/proposal/register", data);
  }

  update(id, data) {
    return http.put(`/instruction/proposal/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/instruction/proposal/${id}`);
  }

  deleteAll() {
    return http.delete(`/instruction/proposal`);
  }
	findByTitle(title) {
    return http.get(`/instruction/proposal/submit?title=${title}`);

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

    return http.get("/submission/proposal/submit");  // proposals 경로로 변경
  }

  s_get(id) {
    return http.get(`/submission/proposal/submit/${id}`);
  }

  s_create(data) {
    return http.post("/submission/proposal/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/submission/proposal/submit/register/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/submission/proposal/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/submission/proposal/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/submission/proposal/submit?title=${title}`);

  }
}

export default new ProposalDataService();