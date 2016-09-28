import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { footerClick, fetchTopics } from '../actions/actionCreators';
import MessagePage from '../components/MessagePage';

function mapStateToProps(state) {
    return {
        user: state.profilePage,
        footer: state.footer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        footerClick: bindActionCreators(footerClick, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)