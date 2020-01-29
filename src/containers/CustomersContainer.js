import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame'
import CustomersList from '../components/CustomersList';
import CustomersActions from '../components/CustomersActions';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchCustomers } from '../actions/fetchCustomers';
import {getCustomers} from '../selectors/customers';

class CustomersContainer extends Component {
  
    handleAddNew = ()=>{
        this.props.history.push('/customers/new');
    }

    renderBody = customers => (
        <div>
            <CustomersList
            customers={customers} 
            urlPath= {'customers/'}/>

            <CustomersActions>
                <button onClick={this.handleAddNew}>
                    Nuevo cliente
                </button>
            </CustomersActions>
        </div>
    );

    componentDidMount() {
        this.props.fetchCustomers();
    }
    

    render() {
        return (
            <div>
                <AppFrame
                    header= 'Listado de clientes'
                    body={
                        this.renderBody(this.props.customers)
                    } 
                />
            </div>
        )
    }
}

CustomersContainer.propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired,
};

CustomersContainer.defaultProps = {
    customers: []
}

const mapStateToProps = state => ({
    customers: getCustomers(state)
});

export default withRouter(connect(mapStateToProps,{fetchCustomers})(CustomersContainer));
