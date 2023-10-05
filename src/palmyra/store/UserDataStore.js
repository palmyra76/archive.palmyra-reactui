import AbstractDataStore from './AbstractDataStore.js';
import { UserDataURL } from './UrlMapping.js';
import { StringFormat } from '../util/StringUtil.js';

class UserDataStore extends AbstractDataStore {

    getUserDataByEmail(callback) {
        this.query(UserDataURL.GET, null, callback);
    }

    updateUserData(user, callback) {
        var url = StringFormat(UserDataURL.UPDATE, user);
        this.update(url, user, callback);
    }

    getUserActivtiesByEmail(email, callback) {
        var url = StringFormat(UserDataURL.GET_ALL, { email: email });
        this.query(url, null, callback);
    }

}

export default UserDataStore;