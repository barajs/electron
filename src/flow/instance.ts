import { flow } from '@barajs/core'
import { Event } from 'electron'

import { ElectronMold, ElectronContext } from '../types'

export interface SecondInstanceProps extends ElectronContext {
  event: Event
  argv: string[]
  workingDirectory: string
}

export const whenSecondInstance = flow<
  SecondInstanceProps,
  ElectronContext,
  ElectronMold
>({
  bootstrap: ({ context, next }) => {
    const { app } = context
    app.on('second-instance', (event, argv, workingDirectory) => {
      next({ ...context, event, argv, workingDirectory })
    })
  },
})
