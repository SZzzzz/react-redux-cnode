import { LOGIN_SUCCEED, LOGIN_FAILED, LOGIN_RESET} from '../actions/constants';

export default function (state = {
    succeedFlag: false,
    failedFlag: false,
    errorMessage: ''
}, action) {
    switch (action.type) {
        case LOGIN_FAILED:
            return Object.assign({}, state, {
                failedFlag: true,
                errorMessage: action.msg
            });
        case LOGIN_SUCCEED:
            return Object.assign({}, state, {
                succeedFlag: true
            });
        case LOGIN_RESET:
            return {
                succeedFlag: false,
                failedFlag: false,
                errorMessage: ''
            };
        default:
            return state;
    }
}