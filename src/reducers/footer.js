import { FOOTER_CLICK } from '../actions/constants';

export default function (state = {index: 'home'}, action) {
    switch (action.type) {
        case FOOTER_CLICK:
            return {
                index: action.index
            };
        default:
            return state
    }
}