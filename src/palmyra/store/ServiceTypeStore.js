import AbstractDataStore from '../store/AbstractDataStore.js';
import { ServiceTypeURL } from '../store/UrlMapping.js';
import { StringFormat } from '../util/StringUtil.js';

class ServiceTypeStore extends AbstractDataStore {

  getAllServiceType(callback) {
    var url = StringFormat(ServiceTypeURL.GET_ALL);
    this.query(url, null, callback);
  }

}

export default ServiceTypeStore;