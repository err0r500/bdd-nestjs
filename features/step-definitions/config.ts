import {
  CustomerRepo,
  AuthenticationGateway
} from '../../src/logic/abstractClasses'
import { CustomerRepoStub } from '../../src/adapters/driven/customerRepo.stub'
import { DriverRepoStub } from '../../src/adapters/driven/driverRepo.stub'
import { AuthenticationGatewayStub } from '../../src/adapters/driven/authGateway.stub'
import { RideRequestRepoStub } from '../../src/adapters/driven/rideRequestRepo.stub'

export class Config {
  public customerRepo: CustomerRepo
  public driverRepo: DriverRepoStub
  public authGateway: AuthenticationGateway
  public rideRequestRepo: RideRequestRepoStub

  public constructor() {
    this.customerRepo = new CustomerRepoStub()
    this.driverRepo = new DriverRepoStub()
    this.authGateway = new AuthenticationGatewayStub()
    this.rideRequestRepo = new RideRequestRepoStub()
  }
}
