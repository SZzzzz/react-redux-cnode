import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { footerClick, loginRequest } from '../actions/actionCreators';
import MessagePage from '../components/LoginPage';

function mapStateToProps(state) {
    return {
        loginPage: state.loginPage,
        user: state.profilePage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginRequest: bindActionCreators(loginRequest, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)