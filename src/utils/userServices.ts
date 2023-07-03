import { fetchWrapper } from "./fetchWrapper";

export const userServices = {
  login,
  getAccounts,
};

function login(jsonData) {
  return fetchWrapper.post("http://localhost:8080/users/login", jsonData)
    .then(async ({res, ok}) => {
      let resJson = await res.json();
      if (resJson.access_token) {
        localStorage.setItem("authtoken", resJson.access_token);
      }
      return {resJson, ok};
    });
}

function getAccounts() {
  return fetchWrapper.get("http://localhost:8080/accounts?page_id=1&page_size=5")
    .then(async ({res, ok}) => {
      let resJson = await res.json();
      return resJson;
    });
}

function getAnAccount() {
  return fetchWrapper.get("http://localhost:8080/accounts/464")
    .then(async ({res, ok}) => {
      let resJson = await res.json();
      return resJson;
    });
}
