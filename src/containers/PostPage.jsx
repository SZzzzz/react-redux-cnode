import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { footerClick, fetchTopicContent } from '../actions/actionCreators';
import PostPage from '../components/PostPage';

function mapStateToProps(state) {
    return {
        user: state.profilePage,
        footer: state.footer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        footerClick: bindActionCreators(footerClick, dispatch),
        fetchTopicContent: bindActionCreators(fetchTopicContent, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)