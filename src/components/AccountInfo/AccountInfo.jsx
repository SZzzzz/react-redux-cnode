import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import Header from '../common/Header';
import Fetching from '../common/Fetching';
import UserInfo from '../common/UserInfo';
import UserActions from '../common/UserActions';

class AccountInfo extends Component {
    render() {
        if(this.props.currentUser.isFetching) {
            return (
                <div>
                    <Header title="加载中..."/>
                    <Fetching/>
                </div>
            )
        }
        let { loginname, recent_topics, recent_replies } = this.props.currentUser;
        return (
            <div>
                <Header title={`${loginname}的个人中心`} backButton={true} backClick={this.context.router.goBack}/>
                <UserInfo userInfo={this.props.currentUser}/>
                <UserActions topics={recent_topics} replies={recent_replies} fetchTopicContent={this.props.fetchTopicContent}/>
            </div>
        )
    }
}

AccountInfo.propTypes = {};

AccountInfo.contextTypes = {
    router: PropTypes.object.isRequired
};

export default AccountInfo;