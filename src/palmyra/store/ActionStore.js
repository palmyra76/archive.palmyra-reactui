import AbstractDataStore from './AbstractDataStore.js';
import { ActionURL } from './UrlMapping.js';
import { StringFormat } from '../util/StringUtil.js';


class ActionStore extends AbstractDataStore {

  getAllActions(serialNumber, callback) {
    var url = StringFormat(ActionURL.GET_ALL, { serialNumber: serialNumber });
    this.query(url, null, callback);
  }

  createAction(action, callback) {
    var url = StringFormat(ActionURL.CREATE, action);
    this.save(url, action, callback);
  }
}

export default ActionStore;