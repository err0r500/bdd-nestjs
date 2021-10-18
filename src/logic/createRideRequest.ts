import {
  AuthenticationGateway,
  DriverRepo,
  EventGateway,
  RideRequestRepo
} from '../logic/abstractClasses'

import { RideRequest, RideRequestCreatedEvent } from '../domain/rideRequest'

export class CreateRideRequest {
  private driverRepo: DriverRepo
  private eventGateway: EventGateway
  private rideRequestRepo: RideRequestRepo
  private authGateway: AuthenticationGateway

  constructor(
    driverRepo: DriverRepo,
    rideRequestRepo: RideRequestRepo,
    authGateway: AuthenticationGateway,
    eventGateway: EventGateway
  ) {
    this.driverRepo = driverRepo
    this.rideRequestRepo = rideRequestRepo
    this.authGateway = authGateway
    this.eventGateway = eventGateway
  }

  public handle(id: string, start: string, arrival: string) {
    const currUser = this.authGateway.getCurrent()
    if (currUser === null) {
      throw new Error('must be logged in to create a RideRequest')
    }

    if (this.driverRepo.getNearby().length === 0) {
      return
    }

    const rideRequest = new RideRequest(id, currUser.id, start, arrival)
    this.rideRequestRepo.save(rideRequest)
    this.eventGateway.emit(new RideRequestCreatedEvent(id))
  }
}
