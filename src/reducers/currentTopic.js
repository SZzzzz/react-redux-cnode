import { REQUEST_CONTENT, RECEIVE_CONTENT, RECEIVE_FAILED } from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case REQUEST_CONTENT:
            return {
                isFetching: true
            };
        case RECEIVE_CONTENT:
            return {
                isFetching: false,
                ...action.data
            };
        case RECEIVE_FAILED:
            return {
                isFetching: false,
                error: action.msg
            };
        default:
            return state;
    }
}