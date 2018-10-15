import axios from 'axios';

import {START, SUCCESS, FAIL} from "../constance";

//hardcoded api's path here
const axiosInstance = axios.create({
  // baseURL: `https://salty-ridge-37026.herokuapp.com/`
	baseURL: `https://localhost:44393/`
});

export default store => next => action => {
  const {type, callAPI, typeOfMethod, apiData, ...rest} = action;


  //  if callAPI param isn't exist nothing will happen...
  if (!callAPI) return next(action);
  next({
    ...rest, type: type + START
  });

  // on another case i'll call to the API
  switch (typeOfMethod) {
    case 'post':
      console.log(`POST REQUEST TO ${callAPI}`);
      const postingData = apiData.data;

      return axiosInstance.post(callAPI, postingData)
        .then(res => {
          console.log(`---- ${res.status} RESPONSE FROM BD: ${JSON.stringify(res.data)}`);
          return res.data;
        })
        .then(responseAPI => next({...rest, type: type + SUCCESS, responseAPI}))
        .catch(error => next({...rest, type: type + FAIL, error}));
    default:
      console.log(`GET REQUEST TO ${callAPI}`);
      return axiosInstance(callAPI)
        .then(res => {
          console.log(`---- ${res.status} RESPONSE FROM BD: ${JSON.stringify(res.data)}`);
          return res.data;
        })
        .then(responseAPI => next({...rest, type: type + SUCCESS, responseAPI}))
        .catch(error => next({...rest, type: type + FAIL, error}))
  }
}