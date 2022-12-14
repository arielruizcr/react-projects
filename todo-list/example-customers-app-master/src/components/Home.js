import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from './AppFrame';
import CustomersActions from './CustomersActions';

class Home extends Component {

    handleOnClick = () => {
        console.log("handleOn Click");
        this.props.history.push('/customers');
    }

    render() {
        return (
            <div>
                <AppFrame
                    header='Inicio'
                    body={
                        <div>
                            <CustomersActions>
                                <button onClick={this.handleOnClick} >Listado de clientes</button>
                            </CustomersActions>
                        </div>
                    }

                ></AppFrame>
            </div>
        );
    }
}

export default withRouter(Home);