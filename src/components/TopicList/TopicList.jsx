import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import TopicItem from '../TopicItem';
import transformDate from '../../utils/transformDate';

class TopicList extends Component {
    render() {
        let { topics, page } = this.props.data;
        let { fetchContent } = this.props;
        let translateTab = {
            ask: '问答',
            share: '分享',
            job: '招聘',
            undefined: ''
        };
        return (
            <ul className={styles.list}>
                {topics.map((item, index) => {
                    let { author, title, reply_count, visit_count, tab, id, create_at, good, top } = item;
                    create_at = transformDate(create_at);
                    return (
                        <TopicItem avatar={author.avatar_url}
                                   title={title}
                                   replyCount={reply_count}
                                   visitCount={visit_count}
                                   tab={translateTab[tab]}
                                   id={id}
                                   createAt={create_at}
                                   good={good}
                                   top={top}
                                   fetchContent={fetchContent}
                                   key={index}
                        />
                    )
                })}
            </ul>
        )
    }
}

TopicList.propTypes = {
    data: PropTypes.object.isRequired
};

export default TopicList