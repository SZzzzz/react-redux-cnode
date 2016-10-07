import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import {Link} from 'react-router';
import prefix from '../../utils/routePrefix';

class TopicItem extends Component {
    render() {
        let { avatar, title, replyCount, visitCount, tab, createAt, good, top, id, fetchContent } = this.props;
        let goodClass = classnames({
            [styles.good]: !good,
            iconfont: true
        });
        let topClass = classnames({
            [styles.top]: !top,
            iconfont: true
        });

        return (
            <li className={styles.item}>
                   <Link to={`${prefix}/topic/${id}`} activeClassName={styles.link} onClick={() => fetchContent(id)}>
                       <div className={styles.wrapper}>
                           <img src={avatar} alt="" className={styles.avatar}/>
                           <p className={styles.title}>
                               <span className={goodClass}>&#xe60d;</span>
                               <span className={topClass}>&#xe67f;</span>
                               {title}
                           </p>
                           <p className={styles.bottom}>{`${replyCount} / ${visitCount}`}<span>{tab}</span></p>
                           <p className={styles.date}>{createAt}</p>
                       </div>
                   </Link>
               </li>
        )
    }

}

TopicItem.propTypes = {
    avatar: PropTypes.string.isRequired,        // 头像urk
    title: PropTypes.string.isRequired,         // 标题
    replyCount: PropTypes.number.isRequired,    // 主题回复数
    visitCount: PropTypes.number.isRequired,    // 主题访问数
    tab: PropTypes.string.isRequired,           // 主题类型
    id: PropTypes.string.isRequired,            // 主题id
    createAt: PropTypes.string.isRequired,      // 发帖时间
    top: PropTypes.bool.isRequired,             // 精华标志
    good: PropTypes.bool.isRequired,            // 置顶标志
};

export default TopicItem