import { REQUEST_USER, RECEIVE_USER } from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case REQUEST_USER:
            return {
                isFetching: true
            };
        case RECEIVE_USER:
            return {
                isFetching: false,
                ...action.data
            };
        default:
            return state;
    }
}
