import React from 'react';
import Bank from './bank';
import swal from 'sweetalert';
import { withRouter } from 'react-router';
class Register extends React.Component {
    state = {
        username: "",
        password: "",
        conpass: "",
        acntno: "",
        balance: ""
    }
    changeUser = (event) => {
        this.setState({ username: event.target.value });
    }
    changePassword = (event) => {
        this.setState({ password: event.target.value });

    }
    changeCpassword = (event) => {
        this.setState({ conpass: event.target.value });

    }
    changeAcntno = (event) => {
        this.setState({ acntno: event.target.value });

    }
    onSubmit = (event) => {
        event.preventDefault();
        let usname = this.state.username;
        let pwd = this.state.password;
        let cpwd = this.state.conpass;   
        let acntno = this.state.acntno;
        Bank.register(usname,pwd,cpwd,acntno)
        .then(response=>{
            swal("Registration success",response.data.message,"success");
            this.props.history.push("/login");
        })
        .catch(err=>{
            swal("Registration fails",err.response.data.message,"error");
        })
        
        // let data = Bank.getAccountDetails()
        // if (usname in data) {
        //     swal("register failed!", "user already exist!", "error");
        // } else if (pwd !== cpwd) {
        //     swal("Password Missmatch", "incorrect password", "error");

        // } else {
        //     Bank.addUser(usname, pwd, acntno);
        //     swal("register success!", " You are a new user", "success");
        //     this.props.history.push('/login');

        // }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <h3>WELCOME TO SBK BANK</h3>
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="jumbotron">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label for="uname">Username</label>
                                    <input type="text" value={this.state.username} onChange={this.changeUser} className="form-control" id="uname" aria-describedby="emailHelp"></input>
                                    <label for="antno">Account number</label>
                                    <input type="text" value={this.state.acntno} onChange={this.changeAcntno} className="form-control" id="antno" aria-describedby="emailHelp"></input>
                                    <div className="form-group">
                                        <label for="pwd">Password</label>
                                        <input type="password" value={this.state.password} onChange={this.changePassword} className="form-control" id="pwd"></input>
                                        <label for="cpwd"> Confirm Password</label>
                                        <input type="password" value={this.state.conpass} onChange={this.changeCpassword} className="form-control" id="cpwd"></input>
                                    </div>
                                    <button type="submit" className="btn btn-primary" >Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Register);