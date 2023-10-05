export default class DeviceInfoConfig {
  static deviceName: string
  static deviceId: string

  constructor() {
    ;(DeviceInfoConfig.deviceId = ''), (DeviceInfoConfig.deviceName = '')
  }
}
