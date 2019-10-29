import { Store } from 'redux'

export interface ReduxMold {
  actions: string[]
  asyncActions: string[]
  preloadedState: any
  reducers: []
  store: Store
}

export interface ReduxContext {
  store: Store
}
