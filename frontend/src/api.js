// import axios from "axios";
// import { toast } from "react-toastify";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default API;

import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

//  GLOBAL SUCCESS + ERROR HANDLING
API.interceptors.response.use(
  (res) => {
    // Optional: show success message automatically
    if (res.data?.message) {
      toast.success(res.data.message);
    }
    return res;
  },
  (err) => {
    // ❌ Error popup
    const msg =
      err.response?.data?.msg ||
      err.response?.data?.error ||
      "Something went wrong";

    toast.error(msg);

    //  Auto logout if token invalid
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);

export default API;