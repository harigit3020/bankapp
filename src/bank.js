import axios from 'axios';
const baseUrl="http://localhost:4000";
let data={ 
    sreedevi:{username:"sreedevi",password:"abc123",acno:1001,balance:50000,history:[]},
    test1:{username:"test1",password:"test1",acno:1002,balance:5000,history:[]},
    test2:{username:"test2",password:"test2",acno:1003,balance:6000,history:[]},
    test3:{username:"test3",password:"test3",acno:1004,balance:7000,history:[]},      
};
let newData=localStorage.getItem("data");
if(newData){
    data=JSON.parse(newData); //convert string to object back 
}
class Bank{
    static currentUser="";
    static setCurrentUser(usname){
        localStorage.setItem("currentUser",usname); //storing data into browsers local storage // no expire like session storage//only string values can be stored
    }
    static getUser(){
        const currentUser=localStorage.getItem("currentUser");
       return currentUser;

    }
    static saveData(){
        localStorage.setItem("data",JSON.stringify(data));//JSON makes the "data" object into string
    }

    static getAccountDetails(){
        return data;
    }
  
    static addUser(username,password,acno){
        data[username]={username,password,acno,history:[],balance:0};
        Bank.saveData();

    }
    static deleteUser(username){
        delete data[username];
    }
    static getUsers(){
        return data;
    }
    static getHistory(){
        return data[Bank.getUser()].history;
    }
    static login(username,password){
        return axios.post(baseUrl+"/users/login",{
            username,
            password
        },{withCredentials:true});
    }
    static register(username,password,conpass,acntno){
        return axios.post(baseUrl+"/users/register",{
            username,
            password,
            conpass,
            acntno
        });
    }
    static deposit(usernamedep,amountdep){
        return axios.post(baseUrl+"/users/deposit",{
            usernamedep,
            amountdep
        },{withCredentials:true});
    }
    static withraw(usernamewith,amountwith){
        return axios.post(baseUrl+"/users/withraw",{
            usernamewith,
            amountwith
        },{withCredentials:true});
    }
    static transhistory(){
        return axios.get(baseUrl+"/users/transactionhistory",{withCredentials:true});
    }

}
export default Bank;