const mainProcessNm = "main"
const rendererProcessNm = "renderer"

class RsshipIpcArgs {
  constructor(to, from, type, value) {
    this.to = to;
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class RsshipIpcToMainArgs extends RsshipIpcArgs {
  constructor(type, value) {
    super(
      mainProcessNm,
      rendererProcessNm,
      type,
      value
    )
  }
}

class RsshipIpcToRendererArgs extends RsshipIpcArgs {
  constructor(type, value) {
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
