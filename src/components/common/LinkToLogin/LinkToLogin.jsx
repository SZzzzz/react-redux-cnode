import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import { Link } from 'react-router';
import prefix from '../../../utils/routePrefix';

class LinkToLogin extends Component {
    render() {
        return (
            <div className={styles.link}>您还未登陆, 请先
                <Link to={`${prefix}/login`}>登陆</Link>
            </div>
        )
    }
}

LinkToLogin.propTypes = {};

export default LinkToLogin;