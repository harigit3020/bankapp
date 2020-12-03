import React from 'react';
import './login.css';
import swal from 'sweetalert';
import Bank from './bank';
import {withRouter} from 'react-router';//withRouter is a higher order component it takes a component and retuns a component
class Login extends React.Component {

    state = {
        username: "",
        password: "",
    }
    changeUser = (event) => {
        this.setState({ username: event.target.value });
    }
    changePassword = (event) => {
        this.setState({ password: event.target.value });

    }
    onSubmit = (event) => {
        event.preventDefault();
        let usname = this.state.username;
        let pwd = this.state.password;
        Bank.setCurrentUser(usname);
        Bank.login(usname,pwd)
        .then(response=>{
            swal("login success",response.data.message,"success");
            this.props.history.push("/home");

        })
        .catch(error=>{
            swal("login failed","invalid data ","error");
            
        })
        // let data = Bank.getAccountDetails()
        // if (usname in data) {
        //     Bank.setCurrentUser(usname);
        //     let password = data[usname]["password"];
        //     if (pwd === password) {
        //         swal("login sucess!", "u provided valid data!", "success");
        //         // setTimeout(() => window.location.href = "usernav.htm", 1000);//Delay calling
        //         this.props.history.push("/home");
        //     }
        //     else {
        //         swal("login failed!", "u provided invalid data!", "error");
        //     }
        // }
        // else {
        //     swal("lnvalid user!", "u provided invalid data!", "error");
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
                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small> */}
                                    <div className="form-group">
                                        <label for="pwd">Password</label>
                                        <input type="password" value={this.state.password} onChange={this.changePassword} className="form-control" id="pwd"></input>
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
export default withRouter(Login);