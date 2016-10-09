import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import Footer from '../common/Footer';
import Header from '../common/Header';
import LinkToLogin from '../common/LinkToLogin';
import { Link } from 'react-router';
import prefix from '../../utils/routePrefix';
import transformDate from '../../utils/transformDate';

class MessagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 'hasnot_read_messages'
        }
    }
    render() {
        let { footer, footerClick, user } = this.props;
        if (!user.token) {
            return (
                <div>
                    <Header title='消息'/>
                    <LinkToLogin/>
                    <Footer index={footer.index} footerClick={footerClick}/>
                </div>
            )
        }
        let data = this.getData();

        let leftBtn = classnames({
            [styles.selected]: this.state.filter === 'hasnot_read_messages'
        });
        let rightBtn = classnames({
            [styles.selected]: this.state.filter === 'has_read_messages'
        });
        return (
            <div>
                <Header title='消息'/>
                <div className={styles.wrapper}>
                    <div className={leftBtn} onClick={() => {this.setState({filter: 'hasnot_read_messages'})}}>未读</div>
                    <div className={rightBtn} onClick={() => {this.setState({filter: 'has_read_messages'})}}>已读</div>
                    <ul>
                        {data.map((item, index) => {
                            let topicID = item.topic.id,
                                sender = item.author.loginname,
                                messageType = item.type,
                                messageContent = item[messageType]['content'];
                            return (
                                <li key={index}>
                                    <p className={styles.info}>
                                        来自: <Link  to={`${prefix}/user/${sender}`} onClick={() => {this.props.fetchUserInfo(sender)}}>{sender}</Link>
                                        <span className={styles.time}>{transformDate(item.create_at)}</span>
                                    </p>
                                    <Link to={`${prefix}/topic/${topicID}`} onClick={() => {this.props.fetchTopicContent(topicID)}}>
                                        <div className="markdown-body" dangerouslySetInnerHTML={{__html: messageContent}}></div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <Footer index={footer.index} footerClick={footerClick}/>
            </div>
        )

    }
    getData() {
        let data = this.props.messagePage.data;
        if (data) {
            return data[this.state.filter]
        } else {
            return []
        }
    }
    componentDidMount() {
        let { footer, footerClick, fetchMessages, user } =  this.props;
        if(footer.index !== 'message'){
            footerClick('message')
        }
        if(user.token) {
            fetchMessages(user.token);
        }
    }
}

MessagePage.propTypes = {};

export default MessagePage;