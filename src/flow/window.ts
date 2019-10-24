import { flow } from '@barajs/core'
import { Event, BrowserWindow } from 'electron'
import { ElectronMold, ElectronContext } from '../types'
import { winNameEq } from '../seep'

export interface BaraBrowserWindow extends BrowserWindow {
  __metadata: any
}

export interface WindowProps extends ElectronContext {
  event: Event
  win: BaraBrowserWindow
}

export interface WindowCreatedProps extends ElectronContext {
  win: BaraBrowserWindow
}
export const whenWindowCreated = flow<
  WindowCreatedProps,
  ElectronContext,
  ElectronMold
>({
  bootstrap: ({ context, mold, next }) => {
    const { windows: windowsConfig } = mold
    const { app, windows } = context
    app.addListener('ready', () => {
      // check for mold with list of register window
      for (const winName in windowsConfig) {
        if (winName in windowsConfig) {
          const winConfig = windowsConfig[winName]
          const win = new BrowserWindow(winConfig) as BaraBrowserWindow
          win.__metadata = { name: winName, config: windowsConfig[winName] }
          windows[winName] = win // TODO Register list of windows based on the Mold configuration
          next({ ...context, win })
        }
      }
    })
  },
  seep: {
    winNameEq,
  },
})

export interface WindowReadyToShowProps extends WindowProps {
  isAlwaysOnTop: boolean
}

export const whenWindowReadyToShow = flow<
  WindowReadyToShowProps,
  ElectronContext,
  ElectronMold
>({
  bootstrap: ({ context, next }) => {
    const { app, windows } = context

    app.addListener('ready', () => {
      for (const winName in windows) {
        if (winName in windows) {
          windows[winName].once(
            'ready-to-show',
            (event: Event, isAlwaysOnTop: boolean) => {
              next({
                ...context,
                isAlwaysOnTop,
                event,
                win: windows[winName] as BaraBrowserWindow,
              })
            },
          )
        }
      }

      for (const winName in windows) {
        if (winName in windows) {
          windows[winName].once(
            'ready-to-show',
            (event: Event, isAlwaysOnTop: boolean) => {
              next({
                ...context,
                isAlwaysOnTop,
                event,
                win: windows[winName] as BaraBrowserWindow,
              })
            },
          )
        }
      }
    })
  },
  seep: {
    winNameEq,
  },
})

export interface WindowAllClosedProps extends WindowProps {
  accessibilitySupportEnabled: boolean
}

export const whenWindowAllClosed = flow<
  WindowAllClosedProps,
  ElectronContext,
  ElectronMold
>({
  bootstrap: ({ context, mold, next }) => {
    const { app } = context
    app.on(
      'window-all-closed',
      (event: Event, accessibilitySupportEnabled: boolean) => {
        const { quitAllClosed } = mold
        if (quitAllClosed) {
          app.quit()
        }
        next({ ...context, event, accessibilitySupportEnabled, win: null })
      },
    )
  },
})
