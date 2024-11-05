import http from "../http-common";

class PlanDataService {
  // 기획서 - 작성 방법 및 예시
  getAll() {
    return http.get("/plan");  // plans 경로로 변경
  }

  get(id) {
    return http.get(`/plan/${id}`);
  }

  create(data) {
    return http.post("/plan/register", data);
  }

  update(id, data) {
    return http.put(`/plan/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/plan/${id}`);
  }

  deleteAll() {
    return http.delete(`/plan`);
  }
	findByTitle(title) {
    return http.get(`/plan/submit?title=${title}`);
  }
  // 기획서 - 제출
  s_getAll() {
    return http.get("/plan/submit");  // plans 경로로 변경
  }

  s_get(id) {
    return http.get(`/plan/submit/${id}`);
  }

  s_create(data) {
    return http.post("/plan/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/plan/submit/register/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/plan/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/plan/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/plan/submit?title=${title}`);
  }
}

export default new PlanDataService();