import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createPinia } from "pinia"


const piniaStore = createPinia()

piniaStore.use(createPersistedState({
    storage: sessionStorage,
    debug: true
  }))

export default piniaStore