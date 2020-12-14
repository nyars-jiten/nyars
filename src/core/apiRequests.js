const axios = require("axios");
import store from '@/store/index'

export async function sendGetRequest(url) {
  let response = {};
  await axios
    .get(process.env.VUE_APP_API + url)
    .then((r) => (response = r))
    .catch((error) => {
      this.$store.actions.newAlert(error, "error");
      console.log(error);
    });

  return response;
}

export async function sendPostRequest(url, body) {
  var response = {};
  await axios
    .post(process.env.VUE_APP_API + url, body, {withCredentials: true})
    .then((r) => (response = r))
    .catch((error) => {
      if (error.response && error.response.data.text) {
        store.dispatch('newAlert', { msg: error.response.data.text, type: "error" } );
      } else {
        store.dispatch('newAlert', { msg: error, type: "error" } );
      }
        // console.log(error);
        response = Promise.reject(error);
    });

  return response;
}

export async function sendDeleteRequest(url) {
  var response = {};
  await axios
    .delete(process.env.VUE_APP_API + url, {withCredentials: true})
    .then((r) => (response = r))
    .catch((error) => {
        store.dispatch('newAlert', { msg: error, type: "error" } );
        // console.log(error);
        response = Promise.reject(error);
    });

  return response;
}

export function getBase64(file) {
  var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}
