import { fetchWrapper } from "./fetchWrapper";

export const userServices = {
  login,
};

function login(jsonData) {
  return fetchWrapper.post("http://localhost:8080/users/login", jsonData)
    .then((user) => {

      return user;
    });
}
