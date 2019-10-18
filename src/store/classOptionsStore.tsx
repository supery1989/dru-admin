import { observable, action } from 'mobx'
import request from '../libs/request'

class classOptionsStore {
  @observable PrimaryClassificationOptions: any = []
  @observable SecondaryClassificationOptions: any = []
  @observable ThirdClassificationOptions: any = []

  @action
  getClassOptions(pid:string, type?: string) {
    const self = this
    request({url: `/category/query?pid=${pid}`})
      .then(
        action((res: any) => {
          console.dir(res)
          if (pid === 'root') {
            const PrimaryClassificationOptions: any = []
            res.data.forEach((item: any) => {
              PrimaryClassificationOptions.push({ label: item.class, value: item._id })
            })
            self.PrimaryClassificationOptions = PrimaryClassificationOptions
          } else {
            if (type === 'third') {
              const ThirdClassificationOptions: any = []
              res.data.forEach((item: any) => {
                ThirdClassificationOptions.push({ label: item.class, value: item._id })
              })
              self.ThirdClassificationOptions = ThirdClassificationOptions
            } else {
              const SecondaryClassificationOptions: any = []
              res.data.forEach((item: any) => {
                SecondaryClassificationOptions.push({ label: item.class, value: item._id })
              })
              self.SecondaryClassificationOptions = SecondaryClassificationOptions
            }
          }
        })
      )
  }
}

export default new classOptionsStore()
