import AbstractDataStore from '../store/AbstractDataStore.js';
import { RemoteAgentURL } from '../store/UrlMapping.js';
import { StringFormat } from '../util/StringUtil.js';

class RemoteAgentStore extends AbstractDataStore {

  getAllAgents(callback) {
    this.query(RemoteAgentURL.GET_ALL, null, callback);
  }

  createAgent(agent, callback) {
    this.save(RemoteAgentURL.CREATE, agent, callback);
  }

  updateAgent(agent, callback) {
    var url = StringFormat(RemoteAgentURL.UPDATE, agent);
    this.update(url, agent, callback);
  }

  deleteAgent(serialNumber, callback) {
    const deleteUrl = `${RemoteAgentURL.DELETE}/${serialNumber}`;
    this.query(deleteUrl, null, callback);
  }

  suspendAgent(serialNumber, callback) {
    const suspendUrl = `${RemoteAgentURL.SUSPEND}/${serialNumber}`;
    this.update(suspendUrl, null, callback);
  }

  reactivateAgent(serialNumber, callback) {
    const reactivateUrl = `${RemoteAgentURL.REACTIVATE}/${serialNumber}`;
    this.update(reactivateUrl, null, callback);
  }

  getAgentBySerialnumber(serialNumber, callback) {
    var url = StringFormat(RemoteAgentURL.GET, { serialNumber: serialNumber });
    this.query(url, null, callback);
  }

  getAllConnection(serialNumber, callback) {
    var url = StringFormat(RemoteAgentURL.GET_ALL_CONN, { serialNumber: serialNumber });
    this.query(url, null, callback);
  }

}

export default RemoteAgentStore;