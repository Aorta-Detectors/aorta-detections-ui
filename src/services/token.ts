class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("ad-token"));
    return user?.refresh_token;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("ad-token"));
    return user?.access_token;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("ad-token"));
    user.access_token = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUserTokens() {
    return JSON.parse(localStorage.getItem("ad-token"));
  }

  setUserTokens(user) {
    localStorage.setItem("ad-token", JSON.stringify(user));
  }

  removeUserTokens() {
    localStorage.removeItem("ad-token");
  }
}

export default new TokenService();