import { WindowProps } from '../flow'

export const showWindow = () => ({ win }: WindowProps) => {
  if (win.isMinimized()) {
    win.restore()
  }
  if (win.isVisible()) {
    win.focus()
  }
  win.show()
}

export const hideWindow = () => ({ win }: WindowProps) => {
  win.hide()
}

export const loadURL = (url: string) => ({ win }: WindowProps) => {
  win.loadURL(url)
}
