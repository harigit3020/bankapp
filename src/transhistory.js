import React from 'react';
import { withRouter } from 'react-router-dom';
import Bank from './bank';
import './table.css';
import swal from 'sweetalert';
class TransactionHistory extends React.Component {
    state={
        history:[],
    }
    render() {
        return (
            <div className="container">
                <h3>Transaction History</h3>
                <table className="table">
                    <tr>
                        <th>Type Of Transaction</th>
                        <th>Amount</th>
                    </tr>
                    {
                         this.state.history.length==0? //Conditional rendering
                         <tr><td>No data</td></tr>:null
                    }
               
                        {
                                this.state.history.map(h => 
                                <tr>
                                <td>{h.typeOfTransaction}</td>
                                <td>{h.amount}</td>
                               </tr>
                               )
                        }
                 
                </table>
            </div>
        );
    }
    componentDidMount(){ //performs after rendering api
        Bank.transhistory()
        .then(response=>{
            this.setState({history:response.data.history})
        })
        .catch(err=>{
            swal("Invalid user",err.response.data.message,"error");
        })
    }
}
export default withRouter(TransactionHistory);