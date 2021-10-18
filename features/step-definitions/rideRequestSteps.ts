import { binding, when, then } from 'cucumber-tsflow'
import { Config } from './config'
import { RideRequestRepoStub } from '../../src/adapters/driven/rideRequestRepo.stub'
import { EventGateway } from '../../src/logic/abstractClasses'
import { expect } from 'chai'

@binding([Config])
class RideRequestSteps {
  private rideRequestRepo: RideRequestRepoStub
  private eventGateway: EventGateway
  private rideRequestID: string

  constructor(config: Config) {
    this.rideRequestRepo = config.rideRequestRepo
    this.eventGateway = config.eventGateway
  }

  @then(/a RideRequest is "([^"]*)" with id "([^"]*)"/)
  private checkRideRequest(status: string, reqID: string) {
    if (status === 'created') {
      expect(this.rideRequestRepo.get(reqID)).not.to.be.undefined
    } else {
      expect(this.rideRequestRepo.get(reqID)).to.be.undefined
    }
  }

  @then(/a RideRequestCreatedEvent is "([^"]*)"/)
  private rideRequestCreatedEventCreate(status: string, callback: any) {
    //if (status === 'created') {
    //  expect(this.rideRequestRepo.get(reqID)).not.to.be.undefined
    //} else {
    //  expect(this.rideRequestRepo.get(reqID)).to.be.undefined
    //}
    callback(null, 'pending')
  }

  @when(/the RideRequestCreatedEvent "([^"]*)" is received/)
  private onRideRequestCreatedEvent(id: string, callback: any) {
    callback(null, 'pending')
  }
}
