import {
  CustomerRepo,
  AuthenticationGateway
} from '../../src/logic/abstractClasses'
import { CustomerRepoStub } from '../stubs/customerRepo.stub'
import { DriverRepoStub } from '../stubs/driverRepo.stub'
import { AuthenticationGatewayStub } from '../stubs/authGateway.stub'
import { RideRequestRepoStub } from '../stubs/rideRequestRepo.stub'
import { EventGatewayStub } from '../stubs/eventGateway.stub'

export class Config {
  public customerRepo: CustomerRepo
  public driverRepo: DriverRepoStub
  public authGateway: AuthenticationGateway
  public rideRequestRepo: RideRequestRepoStub
  public eventGateway: EventGatewayStub

  public constructor() {
    this.customerRepo = new CustomerRepoStub()
    this.driverRepo = new DriverRepoStub()
    this.authGateway = new AuthenticationGatewayStub()
    this.rideRequestRepo = new RideRequestRepoStub()
    this.eventGateway = new EventGatewayStub()
  }
}
