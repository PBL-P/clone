
import http from "../http-common";

class DesignDataService {
    getAll() {
        return http.get("/design");
    }

    get(id) {
        return http.get(`/design/${id}`);
    }

    create(data) {
        return http.post("/design/submit", data);
    }

    update(id, data) {
        return http.put(`/design/${id}`, data);
    }

    delete(id) {
        return http.delete(`/design/${id}`);
    }

    deleteAll() {
        return http.delete("/design");
    }

    findByTitle(title) {
        return http.get(`/design?title=${title}`);
    }
}

export default new DesignDataService();
