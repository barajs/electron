import { portion, flow, popEvent, popSeep } from '@barajs/core'
import { app, BrowserWindow } from 'electron'
import { ElectronMold, ElectronContext } from './types'
import * as flows from './flow'

const Electron = portion<any, ElectronContext, ElectronMold>({
  name: 'bara-electron',
  mold: { singleInstance: true, quitOnClosed: true },
  init: mold => {
    const { appName, singleInstance } = mold
    appName && app.setName(appName)
    const gotTheLock = app.requestSingleInstanceLock()
    if (singleInstance && !gotTheLock) {
      app.quit()
    }

    const windows: ElectronContext['windows'] = {}

    return { app, windows }
  },
  whenInitialized: flow<unknown, ElectronContext, ElectronMold>({
    bootstrap: async ({ context, next }) => {
      const { app: electronApp } = context
      electronApp.addListener('ready', (launchInfo: unknown) => {
        next({ ...context, launchInfo })
      })
    },
  }),
  ...flows,
})

const {
  whenInitialized: whenElectronReady,
  whenWindowReadyToShow,
  whenWindowAllClosed,
  whenWindowCreated,
} = popEvent(Electron)

const { winNameEq } = popSeep(whenWindowCreated)

export {
  Electron,
  whenElectronReady,
  whenWindowReadyToShow,
  whenWindowAllClosed,
  whenWindowCreated,
  winNameEq,
}
export * from './types'
export * from './curry'
export default Electron
