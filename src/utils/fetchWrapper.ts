
export const fetchWrapper = {
  get, 
  post,
};

function get(url: string) {

}

function post(url: string, jsonData) {
  const reqOptions = {
    method: "POST",
    // mode: "cors",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(jsonData), 
  };
  return fetch(url, reqOptions).then(handleRes);
}

function authHeader(url: string) {
  // return auth header with auth token if user is logged in and request is to the api url
  const user = JSON.parse(localStorage.getItem('user'))
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith("localhost");
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}

async function handleRes(res: Response) {
    if (res.status === 200) {
      let resJson = await res.json();
      console.log(resJson);
      console.log(resJson.access_token);
      return true;
    } else {
      console.log("bad res status code");
    }
  return false;
}
