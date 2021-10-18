import {
  DriverRepo,
  RideRequestRepo
} from '../logic/abstractClasses'

import { RideRequest } from '../domain/rideRequest'

export class NotifyRideRequestCreated {
  private driverRepo: DriverRepo
  private rideRequestRepo: RideRequestRepo

  constructor(
    driverRepo: DriverRepo,
    rideRequestRepo: RideRequestRepo,
  ) {
    this.driverRepo = driverRepo
    this.rideRequestRepo = rideRequestRepo
  }

  public handle(rideRequestID: string) {
    const driversNearStart = this.driverRepo.getNearby()
    if (driversNearStart.length === 0) {
      this.notifyCustomer(id)
      return
    }

    this.notifyDrivers(id: string, driversNearStart)
  }
}
