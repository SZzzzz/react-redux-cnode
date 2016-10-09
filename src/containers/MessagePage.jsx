import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { footerClick, fetchTopicContent, fetchMessages, fetchUserInfo } from '../actions/actionCreators';
import MessagePage from '../components/MessagePage';

function mapStateToProps(state) {
    return {
        user: state.profilePage,
        footer: state.footer,
        messagePage: state.messagePage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        footerClick: bindActionCreators(footerClick, dispatch),
        fetchTopicContent: bindActionCreators(fetchTopicContent, dispatch),
        fetchUserInfo: bindActionCreators(fetchUserInfo, dispatch),
        fetchMessages: bindActionCreators(fetchMessages, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)