'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RssIpcEven... Remove this comment to see the full error message
class RssIpcEvent {
  mainProcAction() {
    throw new Error("Not overridden!")
  }

  rendererProcAction() {
    throw new Error("Not overridden!")
  }
}

module.exports = RssIpcEvent
