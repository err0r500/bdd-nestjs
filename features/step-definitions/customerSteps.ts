import { DataTable } from '@cucumber/cucumber'
import { Config } from './config'
import { binding, given, when, then } from 'cucumber-tsflow'
import { expect } from 'chai'
import {
  AuthenticationGateway,
  DriverRepo,
  CustomerRepo
} from '../../src/logic/abstractClasses'
import { Customer } from '../../src/domain/customer'
import { CreateRideRequest } from '../../src/logic/createRideRequest'
import { RideRequestRepoStub } from 'src/adapters/driven/rideRequestRepo.stub'

@binding([Config])
class CustomerSteps {
  private driverRepo: DriverRepo
  private customerRepo: CustomerRepo
  private rideRequestRepo: RideRequestRepoStub
  private authGateway: AuthenticationGateway

  constructor(config: Config) {
    this.driverRepo = config.driverRepo
    this.customerRepo = config.customerRepo
    this.authGateway = config.authGateway
    this.rideRequestRepo = config.rideRequestRepo
  }

  @given(/^some customers exist:$/)
  private customersExist(dataTable: DataTable) {
    dataTable.hashes().map((r: any) => {
      const customer = new Customer(r.id, r.firsName, r.lastName)
      this.customerRepo.save(customer)

      expect(this.customerRepo.all()).to.contain(customer)
    })
    return
  }

  @given(/^I'm authenticated as the customer "([^"]*)"/)
  private authenticatedAs(id: string) {
    const currentCustomer = this.authGateway.getCurrent()

    if (currentCustomer == null) {
      const customerToLogIn = this.customerRepo.getByID(id)
      expect(customerToLogIn).not.to.be.null

      this.authGateway.authenticate(customerToLogIn)
      return
    }
    return
  }

  @when(/I attempt to book a ride from "([^"]*)" to "([^"]*)" with id "([^"]*)"/)
  private createRideRequest(start: string, arrival: string, id : string) {
    const createRideRequest = new CreateRideRequest(
      this.driverRepo,
      this.rideRequestRepo,
      this.authGateway
    )
    createRideRequest.handle(id, start, arrival)
  }

  @then(/customer is "([^"]*)"/)
  private customerNotified(status: string, callback) {
    callback(null, 'pending')
  }
}
