import { combineReducers } from 'redux';
import footer from './footer';
import homePage from './homePage';
import loginPage from './loginPage';
import profilePage from './profilePage';
import currentTopic from './currentTopic';
import currentUser from './currentUser';
import messagePage from './messagePage';

export default combineReducers({
    footer,
    homePage,
    loginPage,
    profilePage,
    currentTopic,
    currentUser,
    messagePage
})