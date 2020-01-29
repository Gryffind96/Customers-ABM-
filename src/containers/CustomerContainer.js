import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import { connect } from 'react-redux'
import {getCustomerByDni} from '../selectors/customers'
import AppFrame from '../components/AppFrame'
import CustomerEdit from '../components/CustomerEdit'
import CustomerData from '../components/CustomerData'
export class CustomerContainer extends Component {


    renderBody = ()=> (
        <Route path="/customers/:dni/edit" children={
            ({ match })=> {
                const CustomerControl = match ?  CustomerEdit : CustomerData; 
                return <CustomerControl {...this.props.customer}/>
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
}

const mapStateToProps = (state,props) => ({
    customer: getCustomerByDni(state,props)
})

export default connect(mapStateToProps, null)(CustomerContainer)
