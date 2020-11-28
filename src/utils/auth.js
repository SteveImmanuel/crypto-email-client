//singleton class for authentication
//callback passed as parameter in case of an asynchronous implementation

class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(callback) {
        //replace with login mechanism
        this.authenticated = true;
        callback();
    }

    logout(callback) {
        this.authenticated = false;
        callback();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();