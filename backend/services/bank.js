
let data = {
    sreedevi: { username: "sreedevi", password: "abc123", acno: 1001, balance: 50000, history: [] },
    test1: { username: "test1", password: "test1", acno: 1002, balance: 5000, history: [] },
    test2: { username: "test2", password: "test2", acno: 1003, balance: 6000, history: [] },
    test3: { username: "test3", password: "test3", acno: 1004, balance: 7000, history: [] },

}
// let currentUser;
function addUser(username,password,acntno) {
    data[username] = { username,password,acntno,history: [], balance: 0 };

}
function getUsers() {
    return data;
}
// function setCurrentUser(username) {
//     currentUser = username;
// }
// function getCurrentUser() {
//     return currentUser;
// }

module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    // setCurrentUser: setCurrentUser,
    // getCurrentUser: getCurrentUser,
}