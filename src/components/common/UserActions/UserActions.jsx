import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import { Link } from 'react-router';
import transformDate from '../../../utils/transformDate';
import prefix from '../../../utils/routePrefix';

class UserActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 'topics'
        }
    }
    render() {
        let data = this.getData();
        let topicBtn = classnames({
            [styles.selected]: this.state.filter === 'topics'
        });
        let replyBtn = classnames({
            [styles.selected]: this.state.filter === 'replies'
        });
        return (
            <div className={styles.wrapper}>
                <div className={topicBtn} onClick={() => {this.setState({filter: 'topics'})}}>主题</div>
                <div className={replyBtn} onClick={() => {this.setState({filter: 'replies'})}}>回复</div>
                <ul>
                    {data.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={`${prefix}/topic/${item.id}`} onClick={() => {this.props.fetchTopicContent(item.id)}}>
                                    <p>{item.title}</p>
                                    <span>{transformDate(item.last_reply_at)}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
    getData() {
        return this.props[this.state.filter] || [];
    }
}

UserActions.propTypes = {
    topics: PropTypes.array.isRequired,
    replies: PropTypes.array.isRequired,
    fetchTopicContent: PropTypes.func.isRequired
};

export default UserActions;