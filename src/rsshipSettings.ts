import fs from 'fs';

export default class RsshipSettings {

  static CYCLE_TIME_KEY = "cyleTime";

  init(store: any) {
    const jsonObject = fs.readFileSync(store.path, 'utf8');
    const settingJson = JSON.parse(jsonObject)

    var isWrite = false

    if(!(RsshipSettings.CYCLE_TIME_KEY in settingJson)) {
      settingJson[RsshipSettings.CYCLE_TIME_KEY] = 30
      isWrite = true;
    }

    if(isWrite) {
      fs.writeFileSync(store.path, JSON.stringify(settingJson, null, 2), 'utf8')
    }
  }

}
