import React from 'react';
import { withRouter } from 'react-router-dom';
import Bank from './bank';
import './table.css';
class Users extends React.Component {
    deleteUser=(username)=>{
        Bank.deleteUser(username);
        Bank.saveData();
        this.setState({});// to rerender the page
    }
    render() {
       let users = Bank.getUsers();
        return (
            <div className="container">
                <h3>Users</h3>
                <table className="table">
                    <tr>
                        <th>Username</th>
                        <th>Balance</th>
                        <th>Remove users</th>
                    </tr>
               
                        {
                           Object.keys(users).map(key=><tr>
                               <td>{users[key].username}</td>
                           <td>{users[key].balance}</td>
                           <td onClick={()=>{this.deleteUser(key)}}>Delete</td>
                           </tr>)
                        }
                 
                </table>
            </div>
        );
    }
}
export default withRouter(Users);