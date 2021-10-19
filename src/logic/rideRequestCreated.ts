import {
  DriverRepo,
  NotificationGateway,
  RideRequestRepo
} from 'src/logic/abstractClasses'
import { Driver } from 'src/domain/driver'

export class RideRequestCreatedHanlder {
  private driverRepo: DriverRepo
  private rideRequestRepo: RideRequestRepo
  private notificationGateway: NotificationGateway

  constructor(
    driverRepo: DriverRepo,
    rideRequestRepo: RideRequestRepo,
    notificationGateway: NotificationGateway
  ) {
    this.driverRepo = driverRepo
    this.rideRequestRepo = rideRequestRepo
    this.notificationGateway = notificationGateway
  }

  public handle(rideRequestID: string) {
    const driversNearStart = this.driverRepo.getNearby()
    if (driversNearStart.length === 0) {
      const customerID = this.rideRequestRepo.getByID(rideRequestID)?.customerID
      if (customerID === undefined) {
        throw new Error(`customer of ${rideRequestID} not found`)
      }
      this.notifyCustomer(customerID, rideRequestID)
      return
    } else {
      this.notifyDrivers(driversNearStart, rideRequestID)
    }
  }

  private notifyCustomer(customerID: string, rideRequestID: string) {
    this.notificationGateway.notifyCustomer(customerID, rideRequestID)
  }

  private notifyDrivers(drivers: Array<Driver>, rideRequestID: string) {
    drivers.map((d: Driver) => {
      this.notificationGateway.notifyDriver(d.id, rideRequestID)
    })
  }
}
