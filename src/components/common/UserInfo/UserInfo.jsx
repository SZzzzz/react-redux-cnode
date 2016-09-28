import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import transformDate from '../../../utils/transformDate';


class UserInfo extends Component {
    render() {
        let { avatar_url, loginname, score, create_at } = this.props.userInfo;
        return (
            <div className={styles.info}>
                <img src={avatar_url} className={styles.avatar}/>
                <p className={styles.name}>{loginname}</p>
                <p className={styles.score}>{`注册于: ${transformDate(create_at)}    积分: ${score}`}</p>
            </div>
        )
    }

}

UserInfo.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default UserInfo;