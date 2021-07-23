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

export class RsshipIpcToMainArgs extends RsshipIpcArgs {
  constructor(type: any, value: any) {
    super(
      mainProcessNm,
      rendererProcessNm,
      type,
      value
    )
  }
}

export class RsshipIpcToRendererArgs extends RsshipIpcArgs {
  constructor(type: any, value: any) {
    super(
      rendererProcessNm,
      mainProcessNm,
      type,
      value
    )
  }
}
