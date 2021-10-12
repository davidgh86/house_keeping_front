import { boot } from 'quasar/wrappers'
import axios from 'axios'
import BackendClient from 'src/services/backend-client'

// const api = axios.create({
//   baseURL: process.env.API_REST_URL || "http://localhost:3000",
// });

// const token = localStorage.getItem('token')
// if (token) {
//   api.defaults.headers.common['Authorization'] = token
// }

// api.interceptors.response.use(undefined, function (err) {
//   return new Promise(function (resolve, reject) {
//   if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
//       store.dispatch('logout')
//   }
//   throw err;
//   });
// });

// api.prototype.login = function(username, password) {
//   return new Promise((resolve, reject) => {
//     api.post(process.env.API_REST_URL+'/user/login', {
//           username: username,
//           password: password
//       })
//       .then((response) => {
//           this.client.defaults.headers.common['Authorization'] = response.data.token
//           resolve(response.data)
//       }, (error) => {
//           reject(error)
//       })
//   })
// }

// api.prototype.logout = function() {
//   delete this.client.defaults.headers.common['Authorization']
// }

const api = new BackendClient();

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(( { app } ) => {
  
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

})

export { axios, api }
