import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-react-73e07.firebaseio.com/"
})


export default instance;