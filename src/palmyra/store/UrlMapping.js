const Url = {
  RemoteAgent: {
    GET_ALL: "configs/remote_agent",
    SEARCH: "",
    CREATE: "configs/remote_agent",
    UPDATE: "/configs/remote_agent/{serialNumber}",
    DELETE: "",
    GET: "configs/remote_agent/{serialNumber}",
    GET_ALL_CONN: "configs/remote_agent/{serialNumber}/connectionhistory"
  },
  Service: {
    GET_ALL: "configs/remote_agent/{serialNumber}/serviceconfig",
    SEARCH: "",
    CREATE: "configs/remote_agent/{serialNumber}/serviceconfig",
    UPDATE: "configs/remote_agent/{serialNumber}/serviceconfig/{id}",
    UPDATE_AUTH: "configs/remote_agent/{serialNumber}/serviceconfig/{serviceId}/authCredentials",
    DELETE: "",
    GET: "configs/remote_agent/{serialNumber}/serviceconfig/{id}"
  },
  ServiceType: {
    GET_ALL: "/configs/service_type"
  },
  Login: {
    CREATE: "/auth/login",
    GET: "/auth/logout"
  },
  ChangePassword: {
    UPDATE: "/user/changepassword"
  },
  UserData: {
    GET: "/user/myprofile",
    UPDATE: "/user/myprofile",
    GET_ALL: "/user/{email}/activity"
  },
  ActionType: {
    GET_All: "/remote_agent/action_type"
  },
  Action: {
    GET_ALL: "configs/remote_agent/{serialNumber}/action",
    CREATE: "configs/remote_agent/{serialNumber}/action/{actionId}"
  },
  AgentStatus: {
    UPDATE_DA: "configs/remote_agent/{serialNumber}/deactivate",
    UPDATE_DC: "configs/remote_agent/{serialNumber}/decommision",
    UPDATE_SP: "configs/remote_agent/{serialNumber}/suspend",
    UPDATE_UR: "configs/remote_agent/{serialNumber}/unregister"
  }
};

const RemoteAgentURL = Url.RemoteAgent;
const ServiceURL = Url.Service;
const ServiceTypeURL = Url.ServiceType;
const LoginURL = Url.Login;
const ChangePasswordURL = Url.ChangePassword;
const UserDataURL = Url.UserData;
const ActionTypeURL = Url.ActionType;
const ActionURL = Url.Action;
const AgentStatusURL = Url.AgentStatus;

export { RemoteAgentURL, ServiceURL, ServiceTypeURL, LoginURL, ChangePasswordURL, UserDataURL, ActionTypeURL, ActionURL, AgentStatusURL };