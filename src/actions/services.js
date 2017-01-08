/* eslint-disable import/prefer-default-export */

import { INITIATE_SERVICES_WITH_TOKEN } from '../constants';

var serviceList = [
  {
    name: "employees",
    url: "https://uptiverse-employee.herokuapp.com/employees",
    token: null,
  },
  {
    name: "recruits",
    url: "https://uptiverse-recruit.herokuapp.com/recruits",
    token: null,
  },
  {
    name: "news",
    url: "https://uptiverse-news.herokuapp.com/news",
    token: null,
  },
];

export function initiateServicesWithToken({ token }) {
  var services = {};

  for(var i= 0; i < serviceList.length; i++){
    var service = serviceList[i];
    service.token = token;
    services[service.name] = service;
  }

  return {
    type: INITIATE_SERVICES_WITH_TOKEN,
    services: services,
  };
}
