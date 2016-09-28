import { LOGIN_SUCCEED, LOGIN_FAILED, LOGIN_RESET, LOGOUT } from '../actions/constants';
import { storeToken, deleteToken } from '../utils/dataStorge';

let defaultState;
if (storeToken('user')) {
    defaultState = JSON.parse(storeToken('user'));
} else {
    defaultState = {};
}
export default function (state = defaultState, action) {
    switch (action.type) {
        case LOGIN_SUCCEED:
            storeToken('user', JSON.stringify(action.data));
            return Object.assign({}, state, action.data);
        case LOGIN_FAILED:
            return {};
        case LOGOUT:
            deleteToken('user');
            return {};
        default:
            return state;
    }
}