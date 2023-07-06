import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",

  }
});


 export  function refreshToken() {

  let currentUser = localStorage.getItem("token")
  
  let token;
  if (currentUser) {
    token = currentUser
  } else {
    token = ""
  }

  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      "Content-type": "application/json",
      'Authorization': `Bearer ${token}`

    }
  });
}