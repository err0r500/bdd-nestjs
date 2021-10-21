import { AuthenticationGateway } from '../../src/logic/abstractClasses'
import { CustomerRepoStub } from '../stubs/customerRepo.stub'
import { DriverRepoStub } from '../stubs/driverRepo.stub'
import { AuthenticationGatewayStub } from '../stubs/authGateway.stub'
import { RideRequestRepoStub } from '../stubs/rideRequestRepo.stub'
import { EventGatewayStub } from '../stubs/eventGateway.stub'
import { NotificationGatewayStub } from '../stubs/notificationGateway.stub'

export class Config {
  customerRepo: CustomerRepoStub
  driverRepo: DriverRepoStub
  authGateway: AuthenticationGateway
  rideRequestRepo: RideRequestRepoStub
  eventGateway: EventGatewayStub
  notificationGateway: NotificationGatewayStub

  constructor() {
    this.customerRepo = new CustomerRepoStub()
    this.driverRepo = new DriverRepoStub()
    this.authGateway = new AuthenticationGatewayStub()
    this.rideRequestRepo = new RideRequestRepoStub()
    this.eventGateway = new EventGatewayStub()
    this.notificationGateway = new NotificationGatewayStub()
  }
}
