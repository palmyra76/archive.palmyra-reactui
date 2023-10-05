import AbstractDataStore from './AbstractDataStore.js';
import { ServiceURL } from './UrlMapping.js';
import { StringFormat } from '../util/StringUtil.js';

class ServiceConfigStore extends AbstractDataStore {

  getAllServiceConfig(serialNumber, callback) {
    var url = StringFormat(ServiceURL.GET_ALL, { serialNumber: serialNumber });
    this.query(url, null, callback);
  }

  addNewService(serviceConfig, callback) {
    var url = StringFormat(ServiceURL.CREATE, serviceConfig);
    this.save(url, serviceConfig, callback);
  }

  createService(serviceConfig, callback) {
    var url = StringFormat(ServiceURL.CREATE, serviceConfig);
    this.save(url, serviceConfig, callback);
  }

  getService(serialNumber, id, callback) {
    var url = StringFormat(ServiceURL.GET, { serialNumber, id });
    this.query(url, null, callback);
  }

  updateService(serviceConfig, callback) {
    var url = StringFormat(ServiceURL.UPDATE, serviceConfig);
    this.update(url, serviceConfig, callback);
  }

  createServiceConfigAuthentication(serviceConfig, callback) {
    var url = StringFormat(ServiceURL.UPDATE_AUTH, serviceConfig);
    this.save(url, serviceConfig, callback);
  }

  updateServiceConfigAuthentication(serviceConfig, callback) {
    var url = StringFormat(ServiceURL.UPDATE_AUTH, serviceConfig);
    this.update(url, serviceConfig, callback);
  }

}

export default ServiceConfigStore;