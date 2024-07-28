import axios from "axios";

const BASE_URL = "https://todo-list-1-dt3y.onrender.com/api/v1"
// const BASE_URL ="http://localhost:5000/api/v1"

const axiosInstance =axios.create(
    {
        baseURL:BASE_URL,
        withCredentials:true,
       
    }
)


export default axiosInstance