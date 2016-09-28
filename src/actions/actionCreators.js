import * as actions from './constants';
import fetch from 'isomorphic-fetch';

// 底部导航栏点击动作
export function footerClick(index) {
    return {
        type: actions.FOOTER_CLICK,
        index
    }
}

// TopicFilter的tab点击动作
export function filterClick(filter) {
    return {
        type: actions.FILTER_CLICK,
        filter
    }
}


// 发送get请求获取topics
export function fetchTopics(filter = 'all', page = 1) {
    return function (dispatch) {
        dispatch(requestTopics());
        return fetch(`https://cnodejs.org/api/v1/topics?tab=${filter}&page=${page}&limit=10&mdrender=false`)
            .then(response => response.json())
            .then(json => {
                if(json.success) {
                    let data = json.data;
                    data.forEach(item => delete item.content);
                    dispatch(receiveTopics(data, filter, page));
                }
            })
    }
}

//  发送请求,载入Fetching
function requestTopics() {
    return {
        type: actions.REQUEST_TOPICS
    }
}

// 请求成功,收到topics数据
function receiveTopics(data, filter, page) {
    return {
        type: actions.RECEIVE_TOPICS,
        data,
        filter,
        page,
    }

}


// 发送登陆请求,验证token
export function loginRequest(token) {
    return function (dispatch) {
        let id;
        return fetch('https://cnodejs.org/api/v1/accesstoken', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `accesstoken=${token}`
                })
            .then(response => response.json())
            .then(json => {
                if (json.success){
                    id = json.id;
                    return fetch(`https://cnodejs.org/api/v1/user/${json.loginname}`);
                } else {
                    dispatch(loginFailed(json.error_msg));
                }
             })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    let data = {
                        ...json.data,
                        id,
                        token
                    };
                    dispatch(loginSucceed(data));

                }
            })
            .then(setTimeout(() => dispatch({type: actions.LOGIN_RESET}), 2000));
    }
}

// 登陆成功
function loginSucceed(data) {
    return {
        type: actions.LOGIN_SUCCEED,
        data
    }
}

// 登陆失败
function loginFailed(msg) {
    return {
        type: actions.LOGIN_FAILED,
        msg
    }
}


// 登出,删除用户信息
export function logout() {
    return {
        type: actions.LOGOUT
    }
}

// 用loginname获取用户信息,存放在state.profile中
export function fetchProfile(name) {
    return function (dispatch) {
        dispatch(requestTopics());
        return fetch(`https://cnodejs.org/api/v1/user/${name}`)
            .then(response => response.json())
            .then(json => {
                if(json.success) {
                    dispatch(receiveProfile(json.data))
                }

            })
    }
}

//  发送请求,载入Fetching
function requestProfile() {
    return {
        type: actions.REQUEST_PROFILE
    }
}

// 请求成功,收到topics数据
function receiveProfile(data) {
    return {
        type: actions.RECEIVE_PROFILE,
        data,
    }

}


// 获取帖子内容 第二个参数用来控制loading图的显示,用来更新点赞状态
export function fetchTopicContent(id, showFetching = true) {
    return function (dispatch) {
        if (showFetching) {
            dispatch(requestTopicContent());
        }
        fetch(`https://cnodejs.org/api/v1/topic/${id}`)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    dispatch(receiveTopicContent(json.data))
                } else {
                    dispatch(receiveFailed((json.error_msg)))
                }
             })
    }
}

// 请求开始,播放loading
function requestTopicContent() {
    return {
        type: actions.REQUEST_CONTENT
    }
}

// 收到内容
function receiveTopicContent(data) {
    return {
        type: actions.RECEIVE_CONTENT,
        data
    }
}

function receiveFailed(msg) {
    return {
        type: actions.RECEIVE_FAILED,
        msg
    }
}


// 使用loginname获取用户信息
export function fetchUserInfo(name) {
    return function (dispatch) {
        dispatch(requestUser());
        return fetch(`https://cnodejs.org/api/v1/user/${name}`)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    dispatch(receiveUser(json.data))
                }
            })
    }
}

function requestUser() {
    return {
        type: actions.REQUEST_USER
    }
}

function receiveUser(data) {
    return {
        type: actions.RECEIVE_USER,
        data
    }
}

export function recordPageY(pageY) {
    return {
        type: actions.RECORD_PAGE_Y,
        pageY
    }
}

