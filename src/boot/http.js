import { boot } from 'quasar/wrappers'
import axios from 'axios'
import BackendClient from 'src/services/backend-client'

const api = new BackendClient();

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(( { app } ) => {
  
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.provide('api', api)

})

export { axios, api }
