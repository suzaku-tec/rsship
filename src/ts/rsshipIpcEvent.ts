'use strict';

export default class RssIpcEvent {
  mainProcAction() {
    throw new Error("Not overridden!")
  }

  rendererProcAction() {
    throw new Error("Not overridden!")
  }
}
