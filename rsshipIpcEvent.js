class RssIpcEvent {
  mainProcAction() {
    throw new Error("Not overridden!")
  }

  rendererProcAction() {
    throw new Error("Not overridden!")
  }
}

module.exports = RssIpcEvent
