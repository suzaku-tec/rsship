// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RsshipSett... Remove this comment to see the full error message
class RsshipSettings {

  static CYCLE_TIME_KEY = "cyleTime";

  init(store: any) {
    const jsonObject = fs.readFileSync(store.path, 'utf8');
    const settingJson = JSON.parse(jsonObject)

    var isWrite = false

    console.log(settingJson)
    if(!(RsshipSettings.CYCLE_TIME_KEY in settingJson)) {
      settingJson[RsshipSettings.CYCLE_TIME_KEY] = 30
      isWrite = true;
    }

    if(isWrite) {
      fs.writeFileSync(store.path, JSON.stringify(settingJson, null, 2), 'utf8')
    }
  }

}

module.exports = RsshipSettings
