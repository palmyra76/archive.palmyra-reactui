import AbstractDataStore from './AbstractDataStore.js';
import { ActionTypeURL } from './UrlMapping.js';
import { StringFormat } from '../util/StringUtil.js';

class ActionTypeStore extends AbstractDataStore {

  getAllActionType(callback) {
    var url = StringFormat(ActionTypeURL.GET_All);
    this.query(url, null, callback);
  }
}

export default ActionTypeStore;