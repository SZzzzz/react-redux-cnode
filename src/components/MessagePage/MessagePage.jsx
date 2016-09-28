import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import Footer from '../common/Footer';
import Header from '../common/Header';
import LinkToLogin from '../common/LinkToLogin';

class MessagePage extends Component {
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
        return (
            <div>
                <Header title='消息'/>
                <Footer index={footer.index} footerClick={footerClick}/>
            </div>
        )

    }
    componentDidMount() {
        let { footer, footerClick } =  this.props;
        if(footer.index !== 'message'){
            footerClick('message')
        }
    }
}

MessagePage.propTypes = {};

export default MessagePage;