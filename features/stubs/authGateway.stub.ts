import { AuthenticationGateway } from '../../src/logic/abstractClasses'
import { Customer } from '../../src/domain/customer'

export class AuthenticationGatewayStub implements AuthenticationGateway {
  private currentCustomer: Customer | null

  constructor() {
    this.currentCustomer = null
  }

  public authenticate(customer: Customer): null {
    this.currentCustomer = customer
    return null
  }

  public getCurrent(): Customer | null {
    return this.currentCustomer
  }
}
