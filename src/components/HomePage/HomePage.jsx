import React, {Component, PropTypes} from 'react';
// import styles from './style.scss';
// import classnames from 'classnames';
import Footer from '../common/Footer';
import TopicFilter from '../TopicFilter';
import TopicList from '../TopicList';
import Fetching from '../common/Fetching';
import getPageSize from '../../utils/getPageSize';

class HomePage extends Component {
    constructor(props) {
        super(props);
        // 用来保存实时的page size 数据
        this.size = null;
    }
    render() {
        let { homePage, footer, filterClick, footerClick, fetchTopicContent } = this.props;
        let { filter } = homePage;
        if (!homePage[filter]) {
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
        }
    }

    componentDidUpdate() {
        this.size = getPageSize();
        let { homePage } =  this.props;
        let data = homePage[homePage.filter];
        window.scrollTo(0, data?data.pageY:0);
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
        let { homePage, footer, footerClick, fetchTopics } =  this.props;
        let data = homePage[homePage.filter];
        if(data) {
            window.scrollTo(0, data.pageY)
        }
        if(footer.index !== 'home'){
            footerClick('home')
        }
        this.size = getPageSize();
        window.onresize = () => {
            this.size = getPageSize();
        };
        window.onscroll = () => {
            if(!this.props.homePage.isFetching){
                let { pageHeight, windowHeight } = this.size;
                if(window.pageYOffset + windowHeight > pageHeight - 50) {
                    let y = window.pageYOffset;
                    let homePage = this.props.homePage;
                    let data = homePage[homePage.filter];
                    fetchTopics(homePage.filter, data.page + 1);
                    this.props.recordPageY(y);
                }
            }
        };
    }

    // 卸载页面前记录当前的pageY值
    componentWillUnmount() {
        this.props.recordPageY(window.pageYOffset);
        window.onscroll = null;
        window.onresize = null;
    }
}

HomePage.propTypes = {};

export default HomePage