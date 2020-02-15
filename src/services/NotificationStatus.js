import { AsyncStorage } from "react-native";
import FetchService from "../services/FetchService";
const global = require('../util/Url');
var status = false

class NotificationStatus {
  getStatus = () => {
    this.updateStatus();
    return status;
  }

  updateStatus = () => {
    if(status===true){
      status = false;
    }else{
      status = true;
    }
  }
}
export default NotificationStatus;