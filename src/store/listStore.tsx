import { observable, action } from 'mobx'
import request from '../libs/request'

class listStore {
  @observable Categorys: any = {}

  @action
  getCategorys() {
    const self = this
    request({url: `/category/query`})
      .then(
        action((res: any) => {
          res.data.forEach((item: any) => {
            self.Categorys[item._id] = item.class
          })
        })
      )
  }
}

export default new listStore()
