import * as actions from '../actions/constants';
import deepAssign from 'deep-assign';

let initialState = {
    filter: 'all',
    isFetching: false,
    all: {
        topics: [],
        page: 1,
        top: 0,
    },
    good: {
        topics: [],
        page: 1,
        top: 0,
    },
    ask: {
        topics: [],
        page: 1,
    },
    share: {
        topics: [],
        page: 1,
    },
    job: {
        topics: [],
        page: 1,
    },
};


export default function(state = {filter: 'all', isFetching: false}, action) {
    switch (action.type) {
        case actions.FILTER_CLICK:
            return Object.assign({}, state, {
                filter: action.filter
            });
        case actions.REQUEST_TOPICS:
            return Object.assign({}, state, {isFetching: true});
        case actions.RECEIVE_TOPICS:
            let { filter, data, page } = action;
            if (state[filter]) {
                let topics = state[filter].topics.concat(data);
                return deepAssign({}, state, {
                    isFetching: false,
                    [filter]: {
                        topics,
                        page
                    }
                })
            }
            return Object.assign({}, state, {
                isFetching: false,
                [filter]: {
                    topics: data,
                    page,
                }
            });
        case actions.RECORD_PAGE_Y:
            return deepAssign({}, state, {[state.filter]: {
                pageY: action.pageY
            }});
        default:
            return state
    }
}

