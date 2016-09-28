import React, {Component, PropTypes} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import { Link } from 'react-router';
import transformDate from '../../utils/transformDate';
import LinkToLogin from '../common/LinkToLogin';
import fetch from 'isomorphic-fetch';

class Replies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyTo: ''
        };

        // 绑定this才能在函数中使用this.props
        this.clickUp = this.clickUp.bind(this);
        this.chooseTarget = this.chooseTarget.bind(this);
        this.postComment = this.postComment.bind(this);
        this.nameClick = this.nameClick.bind(this);
    }
    render() {
        let { replies, user } = this.props;

        // 用来记录replyTo
        let replyTo = '';

        return (
            <div>
                <h5 className={styles.title}>{`共有${replies.length}条回复`}</h5>
                <ul className={styles.replyList}>
                    {replies.map((item, index) => {
                            let { author, create_at, content, ups, id } = item;

                            // 控制up图标的颜色
                            let upClass = classnames({
                                iconfont: true,
                                [styles.hasUp]: this.hasUp(ups)
                            });
                            return (
                                <li className={`${styles.reply} clearfix`} key={index+1}>
                                    <div className={styles.left}>
                                        <img src={author.avatar_url} alt=""/>
                                        <p>{`${index + 1}楼`}</p>
                                    </div>
                                    <div className={styles.right}>
                                        <div className={styles.info}>
                                            <Link to={`/user/${author.loginname}`}
                                                  onClick={() => {this.props.fetchUserInfo(author.loginname)}}
                                            >
                                                {author.loginname}
                                            </Link>
                                            <span>{transformDate(create_at)}</span>
                                        </div>
                                        <div dangerouslySetInnerHTML={{__html: content}}
                                             className="markdown-body"
                                             onClick={this.nameClick}>
                                        </div>
                                        <div className={styles.icon}>
                                            <i className={upClass} onClick={() => this.clickUp(id)}>{`\ue714 ${ups.length}`}</i>
                                            <i className="iconfont" onClick={() => this.chooseTarget(id)}>{'\u{f0016}'}</i>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    )}
                </ul>
                {this.hasLogin(user, replyTo)}
            </div>
        )
    }

    //将每条评论中的ups数组与自身id对比,确认自己有没有点过赞
    hasUp(ups) {
        let { user } = this.props;
        return ups.some((id) => id === user.id)

    }

    // 登陆之后才会显示输入框,否则是LinkToLogin
    hasLogin(user, replyTo) {
        if(!user.id) {
            return <LinkToLogin/>
        }
        return (
            <div className={styles.input}>
                <textarea cols="30" rows="10" placeholder="请输入回复" ref='replyInput'/>
                <button onClick={this.postComment}>回复</button>
            </div>
        )

    }

    // 点赞后刷新,刷新就是重新获取topicContent重新渲染
    clickUp(id) {
        let { token } = this.props.user;
        if(!token) {
            this.context.router.push({pathname: '/login'});
        }
        fetch(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${token}`
        }).then(res => res.json()).then(json => {
                if(json.success) {
                    this.props.refresh();
                }
            }
        )
    }

    chooseTarget(id) {
        this.setState({
            replyTo: id
        })

    }

    // 发表评论
    postComment(id) {
        let reply = this.refs.replyInput.value,
            { token } = this.props.user,
            replyTo = this.state.replyTo,
            topicID = this.props.topicID;
        fetch(`https://cnodejs.org/api/v1/topic/${topicID}/replies`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${token}&content=${reply}&reply_id=${replyTo}`
        }).then(res => res.json()).then(json => {
                if(json.success) {
                    this.props.refresh();
                    this.refs.replyInput.value = '';
                }
            }
        )
    }

    //此方法用来处理评论中的@,手动操作history
    nameClick(e) {
        const target = e.nativeEvent.target;
        if(target.hostname === 'localhost'){
            e.preventDefault();
            e.stopPropagation();
            let loginname = target.innerText.slice(1);
            this.props.fetchUserInfo(loginname);
            this.context.router.push(`/user/${loginname}`);
        }
    }
}

Replies.propTypes = {
    replies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

Replies.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Replies;