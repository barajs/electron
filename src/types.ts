import { BrowserWindowConstructorOptions, App, BrowserWindow } from 'electron'

export interface ElectronMold {
  appName?: string
  singleInstance?: boolean
  quitAllClosed?: boolean
  windows?: {
    [k: string]: BrowserWindowConstructorOptions
  }
}

export interface ElectronContext {
  app: App
  windows: { [k: string]: BrowserWindow }
}
