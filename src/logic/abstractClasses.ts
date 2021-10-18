import { Customer } from '../domain/customer'
import { Driver } from '../domain/driver'

export abstract class CustomerRepo {
  abstract save(Customer)
  abstract all(): Array<Customer>
  abstract getByID(id: string): Customer | undefined
}

export abstract class DriverRepo {
  abstract save(Driver)
  abstract all(): Array<Driver>
  abstract getNearby(): Array<Driver>
}

export abstract class AuthenticationGateway {
  abstract authenticate(customer: Customer)
  abstract getCurrent(): Customer | undefined
}

export abstract class RideRequestRepo {
  abstract save(RideRequest)
}
