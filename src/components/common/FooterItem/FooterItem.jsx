import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './style.scss';
import prefix from '../../../utils/routePrefix';

// 每个Item需要三个参数: 文字(itemName), 图标(itemIcon), 跳转target(linkTarget)
//

class FooterItem extends Component {
    render() {
        let { itemName, itemIcon, linkTarget, selected, index, action } = this.props;
        let itemClass = classNames({
            [styles.selected]: selected,
            [styles.item]: true,
        });
        return (
            <li className={itemClass} onClick={() => {if(!selected) action(index)}}>
                <Link to={`${prefix}${linkTarget}`}>
                    <i className='iconfont'>{itemIcon}</i>
                    <div>
                        {itemName}
                    </div>
                </Link>
            </li>
        )
    }
}

FooterItem.propTypes = {
    itemName: PropTypes.string.isRequired,
    itemIcon: PropTypes.string.isRequired,
    linkTarget: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    index: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
};

export default FooterItem