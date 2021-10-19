import { DomainEvent } from '../domain/domainEvent'

type rideRequestStatus = 'created' | 'accepted'

export class RideRequest {
  readonly id: string
  readonly customerID: string
  private start_address: string
  private arrival_address: string
  private status: rideRequestStatus

  constructor(
    id: string,
    customerID: string,
    start_address: string,
    arrival_address: string
  ) {
    this.id = id
    this.customerID = customerID
    this.start_address = start_address
    this.arrival_address = arrival_address
    this.status = 'created'
  }
}

export class RideRequestCreatedEvent extends DomainEvent {
  readonly requestID: string

  constructor(requestID: string) {
    super()
    this.requestID = requestID
  }
}
