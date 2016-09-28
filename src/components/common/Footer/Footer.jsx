import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import FooterItem from '../FooterItem';
import styles from './style.scss';
class Footer extends Component {
    render() {
        const cn = classnames({
            [styles.footer]: true
        });
        let data = [
            {
                name: '首页',
                icon: '\ue652',
                target: '/',
                index: 'home',
                selected: false
            },
            {
                name: '发表',
                icon: '\ue658',
                target: '/post',
                index: 'post',
                selected: false
            },
            {
                name: '消息',
                icon: '\ue628',
                target: '/message',
                index: 'message',
                selected: false
            },
            {
                name: '我的',
                icon: '\ue618',
                target: '/profile',
                index: 'profile',
                selected: false
            }

        ];
        data.forEach((item) => {
           item.selected = item.index === this.props.index
        });
        return (
            <ul className={cn}>
                {
                    data.map((item, index) => <FooterItem itemName={item.name}
                                                          itemIcon={item.icon}
                                                          linkTarget={item.target}
                                                          selected={item.selected}
                                                          index={item.index}
                                                          action={this.props.footerClick}
                                                          key={index}
                    />)
                }
            </ul>
        )
    }
}

Footer.propTypes = {
    index: PropTypes.string.isRequired,
    footerClick: PropTypes.func.isRequired
};

export default Footer