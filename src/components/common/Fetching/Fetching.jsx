import React, {Component, PropTypes} from 'react';
import styles from './style.scss';

class Fetching extends Component {
    render() {
        return (
            <div className={styles.loader}>Loading...</div>
        )
    }
}

export default Fetching;