import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import Footer from '../common/Footer';
import Header from '../common/Header';
import LinkToLogin from '../common/LinkToLogin';
import Modal from 'react-modal';
import fetch from 'isomorphic-fetch';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.post = this.post.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            show: false,
        }
    }
    render() {
        let { footer, footerClick, user } = this.props;
        if (!user.token) {
            return (
                <div>
                    <Header title='发表主题'/>
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
                padding: '0px',
                background: 'rgba(113,255,177,0.7)'
            }
        };
        return (
            <div>
                <Header title="发表主题"/>
                <div className={styles.input}>
                    <span>请选择主题类型:</span>
                    <select ref="tab">
                            <option value="share">分享</option>
                            <option value="ask">问答</option>
                            <option value="job">招聘</option>
                    </select>
                    <input type="text" ref='title' placeholder="请输入标题"/>
                    <textarea cols="30" rows="15" ref="content" placeholder="请输入内容"/>
                    <button onClick={this.post}>发表</button>
                </div>
                <Footer index="post" footerClick={footerClick}/>
                <Modal isOpen={this.state.show}
                       onRequestClose={this.closeModal}
                       style={customStyles}
                       >
                    <div className={styles.dialog}>
                        {this.state.msg}
                    </div>
                </Modal>
            </div>
        )

    }
    post() {
        let { tab, title, content } = this.refs;
        let { user, fetchTopicContent } = this.props;
        fetch('https://cnodejs.org/api/v1/topics', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${user.token}&tab=${tab.value}&title=${title.value}&content=${content.value}`
        }).then(res => res.json()).then(json => {
            if(json.success) {
                this.setState({
                    show: true,
                    msg: '发表成功',
                });
                fetchTopicContent(json.topic_id);
                setTimeout(() => {this.context.router.push(`/topic/${json.topic_id}`)}, 1000);
            } else {
                this.setState({
                    show: true,
                    msg: json.error_msg,
                });
            }
        })
    }
    closeModal() {
        this.setState({
            show: false
        });
    }

}

PostPage.contentTypes = {
    router: PropTypes.object.isRequired
};

export default PostPage;