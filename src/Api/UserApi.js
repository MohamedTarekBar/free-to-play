import axios from "axios";

let baseUrl = "https://route-egypt-api.herokuapp.com";

async function loginUser(user, d) {
  const { data } = await axios.post(`${baseUrl}/signin`, user);
  d(data);
}

async function registerUser(user, d) {
  const { data } = await axios.post(`${baseUrl}/signup`, user);
  d(data);
}

async function signOutUser(d) {
    let token = {token: localStorage.getItem('userToken')}
    const { data } = await axios.post(`${baseUrl}/signOut`, token);
    d(data);
}

export { loginUser, registerUser, signOutUser};
