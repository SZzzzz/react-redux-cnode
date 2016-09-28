import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { footerClick, filterClick, fetchTopics, fetchTopicContent, recordPageY } from '../actions/actionCreators';
import HomePage from '../components/HomePage';

function mapStateToProps(state) {
    let { footer, homePage } = state;
    return {
        footer,
        homePage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        footerClick: bindActionCreators(footerClick, dispatch),
        filterClick: bindActionCreators(filterClick, dispatch),
        fetchTopics: bindActionCreators(fetchTopics, dispatch),
        fetchTopicContent: bindActionCreators(fetchTopicContent, dispatch),
        recordPageY: bindActionCreators(recordPageY, dispatch),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)