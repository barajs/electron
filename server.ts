import { run, app, act, cond, and, or } from '@barajs/core'
import Electron from './src'

run(
  app({
    portion: [Electron()],
  }),
)
