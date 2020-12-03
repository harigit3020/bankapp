import React from 'react';
import swal from 'sweetalert';
import Bank from './bank';
import {Link} from 'react-router-dom';
class Home extends React.Component {
    state = {
        usernamedep: "",
        amountwith: "",
        usernamewith: "",
        amountdep: "",
        balance: "",

    }
    changeUserDep = (event) => {
        this.setState({ usernamedep: event.target.value });
    }
    changeAmtDep = (event) => {
        this.setState({ amountdep: event.target.value });
    }
    changeUserWith = (event) => {
        this.setState({ usernamewith: event.target.value });
    }
    changeAmtWith = (event) => {
        this.setState({ amountwith: event.target.value });
    }
    deposit = (event) => {
        event.preventDefault();
        let uname = this.state.usernamedep;
        let amt = Number(this.state.amountdep);
        if(uname==Bank.getUser()){
        Bank.deposit(uname,amt)
        .then(response=>{
            this.setState({balance:response.data.balance});
            swal("Credited",response.data.message,"success");
            // this.props.history.push("/home");
        })
        .catch(err=>{
            swal("Deposit failed",err.response.data.message,"error");
        })}else{
            swal("Invalid user","failed","error");
        }
      
        // .then(response=>{
        //     this.setState({balance:response.data.balance});
        //     swal("Credited",response.data.message,"success");
        //     // this.props.history.push("/home");

        // })
        // .catch(err=>{
     
        //     swal("Deposit failed",err.response.data.message,"error");
        // })
    //     if (uname in data) {
    //         // data[uname]["balance"] += amt;
    //         let depbal = data[uname]["balance"] += amt;
    //         data[uname]["history"].push({
    //             typeOfTransaction:"Credit",
    //             amount:amt
    //         })
    //         this.setState({ balance: depbal });
    //         swal("Deposit Successfull!", amt + " Rs credited", "success");
    //         Bank.saveData();
    //     } else {
    //         swal("Account not exist!", "u provided invalid data!", "error");
    //     }
     }
    withdraw = (event) => {
        event.preventDefault();
        let uname = this.state.usernamewith;
        let amt = Number(this.state.amountwith);
        Bank.withraw(uname,amt)
        .then(response=>{
            this.setState({ balance:response.data.balance})
            swal("Withrawel success",response.data.message,"success")    
        })
        .catch(err=>{
            swal("Withrawel failed",err.response.data.message,"error");
        })
        // let data = Bank.getAccountDetails();
        // if (uname in data) {
        //     let avbal = data[uname]["balance"];
        //     if (amt > avbal) {
        //         swal("Insufficient amount!", "avialable balance " + avbal, "error");
        //     } else {
        //         let withbal= data[uname]["balance"] -= amt;
        //         data[uname]["history"].push({
        //             typeOfTransaction:"Debited",
        //             amount:amt
        //         })
        //         this.setState({ balance: withbal });
        //         swal("Withrawel Successfull!", amt + " Rs debited", "success");
        //         Bank.saveData();

        //     }
        // } else {
        //     swal("Account not exist!", "u provided invalid data!", "error");
        // }

    }
    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-4">  Balance:{this.state.balance}<br/>
                    <Link to="/transhistory">Transaction History</Link><br/>
                    <Link to="/login">Logout</Link>
                    </div>                   
                    <div className="col-4'">
                        <div className="jumbotron">
                            <h2>Deposit</h2>
                            <form onSubmit={this.deposit}>
                                <div className="form-group">
                                    <label for="uname">username</label>
                                    <input type="text" value={this.state.usernamedep} onChange={this.changeUserDep} className="form-control" id="uname" aria-describedby="emailHelp" />
                                </div>
                                <div className="form-group">
                                    <label for="amt">Amount</label>
                                    <input type="text" value={this.state.amountdep} onChange={this.changeAmtDep} className="form-control" id="amt" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                    <div className="col-4">
                        <div className="jumbotron">
                            <h2>Withrawel</h2>
                            <form onSubmit={this.withdraw}>
                                <div className="form-group">
                                    <label for="uname">username</label>
                                    <input type="text" value={this.state.usernamewith} onChange={this.changeUserWith} className="form-control" id="uname" aria-describedby="emailHelp" />
                                </div>
                                <div className="form-group">
                                    <label for="amt">Amount</label>
                                    <input type="text" value={this.state.amountwith} onChange={this.changeAmtWith} className="form-control" id="amt" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        
                    </div>
                  
                </div>
            </div>
        );
    }
}
export default Home;