import http from "../http-common";

class ReportDataService {
  // 결과 보고서 - 작성 방법 및 예시
  getAll() {
    return http.get("/report");  // reports 경로로 변경
  }

  get(id) {
    return http.get(`/report/${id}`);
  }

  create(data) {
    return http.post("/report/register", data);
  }

  update(id, data) {
    return http.put(`/report/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/report/${id}`);
  }

  deleteAll() {
    return http.delete(`/report`);
  }
	findByTitle(title) {
    return http.get(`/report/submit?title=${title}`);
  }
  // 결과보고서 - 제출
  s_getAll() {
    return http.get("/report/submit");  // reports 경로로 변경
  }

  s_get(id) {
    return http.get(`/report/submit/${id}`);
  }

  s_create(data) {
    return http.post("/report/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/report/submit/register/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/report/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/report/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/report/submit?title=${title}`);
  }
}

export default new ReportDataService();