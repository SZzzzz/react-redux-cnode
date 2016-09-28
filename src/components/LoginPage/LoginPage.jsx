import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import Header from '../common/Header';
import Modal from 'react-modal';
import { Link } from 'react-router';

class Login extends Component {
    render() {
        let { errorMessage, succeedFlag, failedFlag } = this.props.loginPage;

        return (
            <div>
                <Header title="登陆" backButton={true} backClick={this.context.router.goBack}/>
                <input type="text" ref='token' placeholder="请输入您的Access Token" className={styles.input}/>
                <button ref='submit'
                        onClick={() => {
                                    this.props.loginRequest(this.refs.token.value);
                                    this.refs.submit.disabled = true;
                                 }}
                        className={styles.button}>提交</button>
                <div className={classnames({
                    [styles.hide]: !succeedFlag,
                    [styles.show]: succeedFlag
                })}>登陆成功</div>
                <div className={classnames({
                    [styles.show]: failedFlag,
                    [styles.hide]: !failedFlag
                })}>{`登陆失败: ${errorMessage}`}</div>
            </div>
        )
    }
    componentDidUpdate(preProps) {
        let { failedFlag, succeedFlag } = preProps.loginPage;
        if(failedFlag) {
            this.refs.submit.disabled = false;
            this.refs.token.focus();
        }
        if(succeedFlag) {
            this.context.router.goBack();
        }
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

// react-router 2.0之后废弃了this.props.history等写法,使用this.context.router代替
// 所以需要定义contextType中的router

export default Login;