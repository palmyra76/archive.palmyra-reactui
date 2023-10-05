import AbstractDataStore from './AbstractDataStore.js';
import { AgentStatusURL } from './UrlMapping.js';
import { StringFormat } from '../util/StringUtil.js';

class AgentStatusStore extends AbstractDataStore {

  updateRemoteAgentDeactivate(agentStatus, callback) {
    var url = StringFormat(AgentStatusURL.UPDATE_DA, agentStatus);
    this.update(url, agentStatus, callback);
  }

  updateRemoteAgentDecommision(agentStatus, callback) {
    var url = StringFormat(AgentStatusURL.UPDATE_DC, agentStatus);
    this.update(url, agentStatus, callback);
  }

  updateRemoteAgentSuspend(agentStatus, callback) {
    var url = StringFormat(AgentStatusURL.UPDATE_SP, agentStatus);
    this.update(url, agentStatus, callback);
  }

  updateRemoteAgentUnregister(agentStatus, callback) {
    var url = StringFormat(AgentStatusURL.UPDATE_UR, agentStatus);
    this.update(url, agentStatus, callback);
  }
}

export default AgentStatusStore;