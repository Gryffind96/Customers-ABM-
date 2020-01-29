import {FETCH_CUSTOMERS} from '../constants'
import {createAction} from 'redux-actions'
import {apiGet} from '../api'
import {urlCustomers as url} from '../api/urls';

export const fetchCustomers = createAction(FETCH_CUSTOMERS, apiGet(url)); 