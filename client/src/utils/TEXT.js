import axios from "axios";

export default {
    sendText: function(textData) {
        const { to, message } = textData;
        return axios.post("/api/text", {
            to,
            message
        });
    }
};