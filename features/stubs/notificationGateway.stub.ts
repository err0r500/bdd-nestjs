import { NotificationGateway } from '../../src/logic/abstractClasses'

export class NotificationGatewayStub extends NotificationGateway {
  private customerNotifs: Array<string>
  private driverNotifs: Array<string>

  constructor() {
    super()
    this.customerNotifs = []
    this.driverNotifs = []
  }

  notifyCustomer(customerID: string, msg: string) {
    this.customerNotifs.push(customerID)
  }

  notifyDriver(driverID: string, msg: string) {
    this.driverNotifs.push(driverID)
  }

  getCustomerNotifs(): Array<string> {
    return this.customerNotifs
  }

  getDriverNotifs(): Array<string> {
    return this.driverNotifs
  }
}
