import http from "../http-common";

class ChatRoomDataService {

    getAll() {
        return http.get('/chatrooms');
    }
}

export default new ChatRoomDataService();