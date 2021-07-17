'use strict';

const mainProcessNm = "main"
const rendererProcessNm = "renderer"

class RsshipIpcArgs {
  from: any;
  to: any;
  type: any;
  value: any;
  constructor(to: any, from: any, type: any, value: any) {
    this.to = to;
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RsshipIpcT... Remove this comment to see the full error message
class RsshipIpcToMainArgs extends RsshipIpcArgs {
  constructor(type: any, value: any) {
    super(
      mainProcessNm,
      rendererProcessNm,
      type,
      value
    )
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RsshipIpcT... Remove this comment to see the full error message
class RsshipIpcToRendererArgs extends RsshipIpcArgs {
  constructor(type: any, value: any) {
    super(
      rendererProcessNm,
      mainProcessNm,
      type,
      value
    )
  }
}

module.exports = {
  RsshipIpcToMainArgs,
  RsshipIpcToRendererArgs
}
