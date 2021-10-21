import { Injectable } from '@nestjs/common'
import {
  AuthenticationGateway,
  DriverRepo,
  EventGateway,
  RideRequestRepo
} from '../logic/abstractClasses'
import { RideRequest, RideRequestCreatedEvent } from '../domain/rideRequest'

@Injectable()
export class CreateRideRequest {
  constructor(
    private readonly driverRepo: DriverRepo,
    private readonly rideRequestRepo: RideRequestRepo,
    private readonly authGateway: AuthenticationGateway,
    private readonly eventGateway: EventGateway
  ) {}

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
