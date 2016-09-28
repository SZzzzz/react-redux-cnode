import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';

class Header extends Component {
    render() {
        let { backButton, backClick } = this.props;
        let backClass = classnames({
            [styles.hidden]: !backButton,
            [styles.back]: true
        });
        return (
            <div className={styles.header}>
                <p>{this.props.title}</p>
                <div className={backClass} onClick={backClick}><i className="iconfont">{'\u{f007a}'}</i></div>
            </div>
        )
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    backButton: PropTypes.bool,
    backClick: PropTypes.func
};

export default Header;