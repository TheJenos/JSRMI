module.exports = function () {
    this.test = async function (gg) {
        console.log("tst is run " + gg);
        return { fff: "ddd" };
    }
    this.login = async function (Username, Password) {
        if (Username == "" || Username == undefined) throw "Invalid Username";
        if (Password == "" || Password == undefined) throw "Invalid Password";
        return (Username == "ABC" && Password == "123") ? "Login Success" : " Login Fail";
    }
}