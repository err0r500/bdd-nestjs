import { DataTable } from '@cucumber/cucumber'
import { binding, given, when, then } from 'cucumber-tsflow'
import { Config } from './config'
import { RideRequestRepoStub } from '../stubs/rideRequestRepo.stub'
import { DriverRepoStub } from 'features/stubs/driverRepo.stub'
import { EventGatewayStub } from '../stubs/eventGateway.stub'
import { NotificationGatewayStub } from '../stubs/notificationGateway.stub'
import { expect } from 'chai'
import { RideRequestCreatedHanlder } from '../../src/logic/rideRequestCreated'
import { RideRequest } from '../../src/domain/rideRequest'

@binding([Config])
class RideRequestSteps {
  private rideRequestRepo: RideRequestRepoStub
  private eventGateway: EventGatewayStub
  private driverRepo: DriverRepoStub
  private notificationGateway: NotificationGatewayStub

  constructor(config: Config) {
    this.rideRequestRepo = config.rideRequestRepo
    this.eventGateway = config.eventGateway
    this.driverRepo = config.driverRepo
    this.notificationGateway = config.notificationGateway
  }

  @given(/RideRequest have been created/)
  private rideRequestCreated(dataTable: DataTable) {
    dataTable.hashes().map((r: any) => {
      const rideRequest = new RideRequest(
        r.id,
        r.customer_id,
        r.start_address,
        r.arrival_address
      )
      this.rideRequestRepo.save(rideRequest)
      expect(this.rideRequestRepo.all()).to.contain(rideRequest)
    })
    return
  }

  @then(/a RideRequest is "([^"]*)" with id "([^"]*)"/)
  private checkRideRequest(status: string, reqID: string) {
    const rideRequest = this.rideRequestRepo.getByID(reqID)
    if (status === 'created') {
      expect(rideRequest).not.to.be.undefined
    } else {
      expect(rideRequest).to.be.undefined
    }
  }

  @then(/a RideRequestCreatedEvent is "([^"]*)" for rideRequest "([^"]*)"/)
  private checkRideRequestCreatedEventCreation(status: string, reqID: string) {
    const event = this.eventGateway
      .all()
      .filter((e: any) => e?.requestID === reqID)[0]

    if (status === 'created') {
      expect(event).not.to.be.undefined
    } else {
      expect(event).to.be.undefined
    }
  }

  @when(/the RideRequestCreatedEvent "([^"]*)" is received/)
  private onRideRequestCreatedEvent(rideRequestID: string) {
    new RideRequestCreatedHanlder(
      this.driverRepo,
      this.rideRequestRepo,
      this.notificationGateway
    ).handle(rideRequestID)
  }
}
