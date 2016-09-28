import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';

class TopicFilter extends Component {
    render() {
        let data = [
            {
                title: '全部',
                filter: 'all',
                cn: ''
            },
            {
                title: '精华',
                filter: 'good',
                cn: ''
            },
            {
                title: '分享',
                filter: 'share',
                cn: ''
            },
            {
                title: '问答',
                filter: 'ask',
                cn: ''
            },
            {
                title: '招聘',
                filter: 'job',
                cn: ''
            }
        ];
        data.forEach((item) => {
            if (item.filter === this.props.filter) {
                item.cn = classnames({
                    [styles.selected]: item.filter === this.props.filter
                })
            }
        });
        return (
            <ul className={styles.filter}>
                {
                    data.map((item, index) => {
                        return (
                            <li key={index}
                                className={item.cn}
                                onClick={() => {
                                    if (item.filter !== this.props.filter) {
                                        this.props.handeleClick(item.filter)
                                    }
                                }}
                            >
                                {item.title}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

TopicFilter.propTypes = {
    filter: PropTypes.string.isRequired,
    handeleClick: PropTypes.func.isRequired
};

export default TopicFilter