import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import Footer from '../common/Footer';
import Header from '../common/Header';
import LinkToLogin from '../common/LinkToLogin';
import UserInfo from '../common/UserInfo';
import { Link } from 'react-router';
import Modal from 'react-modal';
import UserActions from '../common/UserActions';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this)
    }
    render() {

        let { footer, footerClick, profile, fetchTopicContent } = this.props;
        if (!profile.token) {
            return (
                <div>
                    <Header title='个人中心' backButton={false}/>
                    <LinkToLogin/>
                    <Footer index={footer.index} footerClick={footerClick}/>
                </div>
            )
        }
        const customStyles = {
            content : {
                boxSizing: 'border-box',
                width: '400px',
                height: '100px',
                top: '50%',
                left : '50%',
                marginLeft: '-200px',
                marginTop: '-50px',
                padding: '0px'
            }
        };
        return (
            <div>
                <Header title='个人中心'/>
                <div className={styles.logout} onClick={this.openModal}>
                    <i className="iconfont">&#xe653;</i>
                </div>
                <UserInfo userInfo={profile}/>
                <UserActions topics={profile.recent_topics || []} replies={profile.recent_replies || []}  fetchTopicContent={fetchTopicContent}/>
                <Footer index={footer.index} footerClick={footerClick}/>
                <Modal isOpen={this.state.openModal}
                       style={customStyles}>
                    <div className={styles.dialog}>
                        <h5>确认退出?</h5>
                        <button onClick={this.closeModal}>取消</button>
                        <button onClick={this.props.logout}>确定</button>
                    </div>
                </Modal>
            </div>
        )

    }
    openModal() {
        this.setState({
            openModal: true
        })
    }
    closeModal() {
        this.setState({
            openModal: false
        })
    }
    componentWillMount() {
        let { profile, fetchUserInfo } = this.props;
        fetchUserInfo(profile.loginname, true);
    }
    componentDidMount() {
        let { footer, footerClick } =  this.props;
        if(footer.index !== 'profile'){
            footerClick('profile')
        }
    }
}

ProfilePage.propTypes = {};

export default ProfilePage;