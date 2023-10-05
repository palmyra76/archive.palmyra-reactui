import axios from 'axios';
import { LoginURL } from './UrlMapping.js';
import { StringFormat } from '../util/StringUtil.js';
import Swal from 'sweetalert2';

class LoginStore {
  instance = axios.create({
    baseURL: '/api'
  });

  newlogin(login, callback) {
    var url = StringFormat(LoginURL.CREATE, login);
    this.instance.post(url, login)
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        this.globalHandleError(error);
      });
  }

  getLogout(callback) {
    var url = StringFormat(LoginURL.GET);
    this.instance.get(url)
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        this.globalHandleError(error);
      });
  }

  globalHandleError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        html: "<div class='custom-alert-container'><svg class='custom-alert-icon' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path class='warning-icon' d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 16H11V14H13V16ZM13 12H11V8H13V12Z'/></svg> Invalid Credentials.</div>",
        showConfirmButton: false,
      });
    } else if (error.response && error.response.status >= 500) {
      Swal.fire({
        html: "<div class='custom-alert-container'><svg class='custom-alert-icon' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path class='error-icon' d='M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm5.793-4.207a1 1 0 0 1 1.414 0L12 10.586l2.793-2.793a1 1 0 1 1 1.414 1.414L13.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414L12 13.414l-2.793 2.793a1 1 0 0 1-1.414-1.414L10.586 12 7.793 9.207a1 1 0 0 1 0-1.414z'/></svg> Unexcepted Error Occured.</div>",
        showConfirmButton: false,
      });
    } else {
      console.log(error);
    }
  };

};

export default LoginStore;