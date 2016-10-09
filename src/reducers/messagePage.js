import { REQUEST_MESSAGES, RECEIVE_MESSAGES } from '../actions/constants';

export default function (state = {
    isFetching: false,
    data: null
}, action) {
    switch (action.type) {
        case REQUEST_MESSAGES:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_MESSAGES:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data
            });
        default:
            return state;
    }
}