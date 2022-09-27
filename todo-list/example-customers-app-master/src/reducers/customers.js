import { handleActions } from 'redux-actions';
import { FETCH_CUSTOMERS, 
    INSERT_CUSTOMER, 
    UPDATE_CUSTOMER, 
    DELETE_CUSTOMER } from './../constants/index';

export const customers = handleActions({
    [FETCH_CUSTOMERS]: (state, action) => [ ...action.payload],
    [INSERT_CUSTOMER]: (state, action) => [ ...state, action.payload ],
    [UPDATE_CUSTOMER]: (state, action) => {
        const customerPayload = action.payload;
        const { id } = customerPayload;
        let customers = state;
        const foundIndex = customers.findIndex(x => x.id === id);
        customers[foundIndex] = customerPayload;

        return customers;
    },
    [DELETE_CUSTOMER]: (state, action) => {
        return state.filter(c => c.id !== action.payload)
    }
}, []);

