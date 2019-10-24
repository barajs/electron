# Bara with Electron integration

Bara makes it able to setup and run the Electron application in a minute.

## Install

```
npm install --save @barajs/core @barajs/electron
```

## Usage

```typescript
import { run, app, act, cond } from "@barajs/core";
import Electron, {
  whenWindowCreated,
  whenWindowReadyToShow,
  whenWindowAllClosed,
  showWindow,
  winNameEq,
  loadURL
} from "@barajs/electron";

run(
  app({
    portion: [
      Electron({
        singleInstance: true,
        windows: {
          main: {
            width: 1024,
            height: 768,
            show: false
          },
          tv: {
            width: 768,
            height: 768,
            show: false
          }
        }
      })
    ],
    trigger: [
      whenWindowCreated(
        cond(winNameEq("tv"), act(loadURL("https://npmjs.org"))),
        cond(winNameEq("main"), act(loadURL("https://github.com")))
      ),
      whenWindowReadyToShow(
        cond(winNameEq("main"), act(showWindow())),
        cond(winNameEq("tv"), act(showWindow()))
      ),
      whenWindowAllClosed(
        act(({ app }) => {
          console.log(`All windows has been closed`);
          app.quit();
        })
      )
    ]
  })
);

```
