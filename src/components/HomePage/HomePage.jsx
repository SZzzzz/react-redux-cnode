import React, {Component, PropTypes} from 'react';
// import styles from './style.scss';
// import classnames from 'classnames';
import Footer from '../common/Footer';
import TopicFilter from '../TopicFilter';
import TopicList from '../TopicList';
import Fetching from '../common/Fetching';

class HomePage extends Component {
    render() {
        let { homePage, footer, filterClick, footerClick, fetchTopics, fetchTopicContent } = this.props;
        let { isFetching, filter } = homePage;
        if (isFetching || !homePage[filter]) {
            return (
                <div>
                    <Fetching />
                </div>
            )
        } else {
            return (
                <div>
                    <TopicFilter filter={filter} handeleClick={filterClick}/>
                    <TopicList data={homePage[filter]} filter={filter} fetchContent={fetchTopicContent}/>
                    <Footer index={footer.index} footerClick={footerClick}/>
                </div>
            )
        }

    }

    // 切换tab时检查并获取数据
    componentWillReceiveProps(newProps) {
        let { homePage } =  newProps;
        let data = homePage[homePage.filter];
        if (!data && !homePage.isFetching) {
            newProps.fetchTopics(homePage.filter);
        } else {
        }
    }

    // 载入界面前检查是否有数据,没有的话则获取数据
    componentWillMount () {
        let { homePage } =  this.props;
        if (!homePage[homePage.filter]) {
            this.props.fetchTopics();
        }
    }

    // 加载完页面滚动到上次记录的pageY处
    componentDidMount() {
        let { homePage } =  this.props;
        let data = homePage[homePage.filter];
        if(data) {
            window.scrollTo(0, data.pageY)
        }
    }

    // 卸载页面前记录当前的pageY值
    componentWillUnmount() {
        this.props.recordPageY(window.pageYOffset);
    }
}

HomePage.propTypes = {};

export default HomePage