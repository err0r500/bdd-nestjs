type rideRequestStatus = 'created' | 'accepted'

export class RideRequest {
  readonly id: string
  private customerID: string
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

export class RideRequestCreatedEvent {
  readonly requestID: string

  constructor(requestID: string) {
    this.requestID = requestID
  }
}
