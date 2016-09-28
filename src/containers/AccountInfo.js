import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTopicContent } from '../actions/actionCreators';
import AccountInfo from '../components/AccountInfo';

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTopicContent: bindActionCreators(fetchTopicContent, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);