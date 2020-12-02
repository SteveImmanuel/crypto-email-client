//singleton class for authentication
//callback passed as parameter in case of an asynchronous implementation

class Auth {
  constructor() {
    this.authenticated = true;
    this.data = null;
  }

  setAuthenticated(status) {
    this.authenticated = status;
  }

  setData(data) {
    this.data = data;
  }

  login(callback) {
    this.authenticated = true;
    callback();
  }

  logout(callback) {
    this.authenticated = false;
    callback();
  }

  getData() {
    return this.data;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();