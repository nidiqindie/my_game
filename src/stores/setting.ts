import { defineStore } from 'pinia'
interface Setting_type {
  count: number
  time: number
}
export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      Setting: {} as Setting_type,
    }
  },
  actions: {
    set_setting_all(count: number, time: number) {
      this.Setting.count = count
      this.Setting.time = time
    },
    set_setting_count(count: number) {
      this.Setting.count = count
    },
    set_setting_time(time: number) {
      this.Setting.time = time
    },
  },
})
