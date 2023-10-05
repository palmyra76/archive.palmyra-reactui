import AbstractDataStore from './AbstractDataStore.js';
import { ChangePasswordURL } from './UrlMapping.js';
import { StringFormat } from '../util/StringUtil.js';

class ChangePasswordStore extends AbstractDataStore {

    updatePassword(password, callback) {
        var url = StringFormat(ChangePasswordURL.UPDATE, password);
        this.update(url, password, callback);
    }

}

export default ChangePasswordStore;