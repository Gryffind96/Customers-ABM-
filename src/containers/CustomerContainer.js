import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {getCustomerByDni} from '../selectors/customers'
import AppFrame from '../components/AppFrame'
import CustomerEdit from '../components/CustomerEdit'
import CustomerData from '../components/CustomerData'
import {fetchCustomers} from '../actions/fetchCustomers'
import {updateCustomer} from '../actions/updateCustomer'
export class CustomerContainer extends Component {

    componentDidMount() {
        if(!this.props.customer)
            this.props.fetchCustomers();
    }
    
    
    handleSubmit = values => {
        console.log(JSON.stringify(values));
        const {id} = values;
        return this.props.updateCustomer(id,values)
    }

    handleOnBack = ()=>{
        this.props.history.goBack();
    }

    handleOnSubmitSuccess = ()=>{
        this.handleOnBack();
    }

    renderBody = ()=> (
        <Route path="/customers/:dni/edit" children={
            ({ match })=> {

                if(this.props.customer){
                    const CustomerControl = match ?  CustomerEdit : CustomerData; 
                    return <CustomerControl 
                        onSubmit={this.handleSubmit}
                        onSubmitSuccess={this.handleOnSubmitSuccess}
                        onBack={this.handleOnBack} 
                        {...this.props.customer}/>
                }

                return null

                
            } 
        } />
    )

    render() {
        return (
            <div>
                <AppFrame 
                    header={`Cliente ${this.props.dni}`}
                    body={
                        this.renderBody()
                    }></AppFrame>
            </div>
        )
    }
}

CustomerContainer.propTypes = {
    dni: PropTypes.string.isRequired,
    customer: PropTypes.object,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
}

const mapStateToProps = (state,props) => ({
    customer: getCustomerByDni(state,props)
})

export default withRouter(connect(mapStateToProps, {
    fetchCustomers,
    updateCustomer
})(CustomerContainer)) 
