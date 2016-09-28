import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import Header from '../common/Header';
import Fetching from '../common/Fetching';
import { Link } from 'react-router';
import transformDate from '../../utils/transformDate';
import Replies from '../Replies';

class TopicContent extends Component {
    render() {
        let { currentTopic } = this.props;
        if(currentTopic.isFetching) {
            return (
                <div>
                    <Header title="加载中..."/>
                    <Fetching/>
                </div>
            )
        }
        if(currentTopic.error) {
            return (
                <div>
                    <Header title="详情" backButton={true} backClick={this.context.router.goBack}/>
                    <h4>{currentTopic.error}</h4>
                </div>
            )
        }
        let { title, content, author, create_at, visit_count, reply_count, replies, id } = this.props.currentTopic;
        let refresh = () => {
            this.props.fetchTopicContent(id, false);
        };

        return (
            <div>
                <Header title="详情" backButton={true} backClick={this.context.router.goBack}/>
                <div className={`${styles.info}`}>
                    <div className={styles.avatar}>
                        <Link to={`/user/${author.loginname}`} onClick={() => {this.props.fetchUserInfo(author.loginname)}}>
                            <img src={author.avatar_url} alt=""/>
                        </Link>
                    </div>
                    <div className={styles.title}>
                        <h5>{title}</h5>
                        <p>
                            <Link to={`/user/${author.loginname}`} onClick={() => {this.props.fetchUserInfo(author.loginname)}}>
                                {author.loginname}
                            </Link>    发表于:{transformDate(create_at)}    浏览:{visit_count}    回复:{reply_count}
                        </p>
                    </div>
                </div>
                <div className={`${styles.content} markdown-body`} dangerouslySetInnerHTML={{__html: content}}></div>
                <Replies replies={replies} user={this.props.user} refresh={refresh} topicID={id} fetchUserInfo={this.props.fetchUserInfo}/>
            </div>
        )
    }

}

TopicContent.propTypes = {};

TopicContent.contextTypes = {
    router: PropTypes.object.isRequired
};

export default TopicContent;