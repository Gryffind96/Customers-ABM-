import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppFrame from '../components/AppFrame'
import CustomerEdit from '../components/CustomerEdit'
import {insertCustomer} from '../actions/insertCustomer'
class NewCustomerContainer extends Component {
    
    handleSubmit = values=>{
        this.props.insertCustomer(values);
    }

    handleOnSubmitSuccess= ()=>{
        this.handleOnBack();
    }

    handleOnBack = ()=>{
        this.props.history.goBack();
    }

    renderBody = ()=>{
        const newCustomer = {
            "id": "",
            "dni": "",
            "name": "",
            "age": 0
          };
        return <CustomerEdit 
                    {...newCustomer}
                    onSubmit={this.handleSubmit}
                    onSubmitSuccess={this.handleOnSubmitSuccess}
                    onBack={this.handleOnBack} />
    }

    render() {
        return (
            <div>
                <AppFrame 
                    header={`Creación de nuevo cliente`}
                    body={this.renderBody()}   >
                    
                </AppFrame>
            </div>
        )
    }
}

NewCustomerContainer.propTypes={
    insertCustomer: PropTypes.func.isRequired,
}

export default withRouter(connect(null,{insertCustomer}) (NewCustomerContainer)); 
