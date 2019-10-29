import { portion, flow, popEvent, popSeep } from '@barajs/core'
import { ReduxMold, ReduxContext } from './types'
import { createStore } from 'redux'
// import * as flows from './flow'

const Redux = portion<any, ReduxContext, ReduxMold>({
  name: 'bara-redux',
  mold: {},
  init: mold => {
    const { reducers, preloadedState, store: predefinedStore } = mold
    const store = !predefinedStore
      ? createStore(reducers, preloadedState)
      : predefinedStore
    return { store }
  },
  whenInitialized: flow<unknown, ReduxContext, ReduxMold>({
    bootstrap: ({ context, next }) => {
      const { store } = context
      next({})
    },
  }),
  whenStateChanged: flow<any, ReduxContext, ReduxMold>({
    bootstrap: ({ context, next }) => {
      const { store } = context
      store.subscribe(() => {
        next(store.getState())
      })
    },
  }),
  // ...flows,
})

const { whenInitialized: whenStoreListening, whenStateChanged } = popEvent(
  Redux,
)

export { Redux, whenStoreListening, whenStateChanged }
export * from './types'
// export * from './formula'
export default Redux
