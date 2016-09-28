import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserInfo, fetchTopicContent } from '../actions/actionCreators';
import TopicContent from '../components/TopicContent';

function mapStateToProps(state) {
    return {
        currentTopic: state.currentTopic,
        user: state.profilePage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUserInfo: bindActionCreators(fetchUserInfo, dispatch),
        fetchTopicContent: bindActionCreators(fetchTopicContent, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicContent);