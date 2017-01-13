import { INITIATE_SERVICES_WITH_TOKEN } from '../constants';
import { serviceList } from '../constants/services';

export function getServiceList() {
  var services = {};

  for(var i= 0; i < serviceList.length; i++){
    var service = serviceList[i];
    service.token = token;
    services[service.id] = service;
  }

  return {
    type: GET_SERVICES,
    services: services,
  };
}

export function initiateServicesWithToken({ token }) {
  var services = {};

  for(var i= 0; i < serviceList.length; i++){
    var service = serviceList[i];
    service.token = token;
    services[service.id] = service;
  }

  return {
    type: INITIATE_SERVICES_WITH_TOKEN,
    services: services,
  };
}
