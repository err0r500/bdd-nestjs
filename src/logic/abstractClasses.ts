import { Injectable } from '@nestjs/common'
import { Customer } from '../domain/customer'
import { Driver } from '../domain/driver'
import { DomainEvent } from '../domain/domainEvent'
import { RideRequest } from '../domain/rideRequest'

@Injectable()
export abstract class CustomerRepo {
  abstract save(Customer)
  abstract getByID(id: string): Customer | undefined
}

export abstract class DriverRepo {
  abstract save(Driver)
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

export abstract class RepoEntity<D> {
  abstract fromDomain(domain: D)
  abstract toDomain(): D
}
