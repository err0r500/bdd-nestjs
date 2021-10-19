import { Customer } from '../domain/customer'
import { Driver } from '../domain/driver'
import { DomainEvent } from '../domain/domainEvent'
import { RideRequest } from '../domain/rideRequest'

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
  abstract getByID(id: string): RideRequest | undefined
}

export abstract class EventGateway {
  abstract emit(DomainEvent)
}

export abstract class NotificationGateway {
  abstract notifyCustomer(customerID: string, msg: string)
  abstract notifyDriver(driverID: string, msg: string)
}
