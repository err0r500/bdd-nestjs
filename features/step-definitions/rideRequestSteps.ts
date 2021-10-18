import { binding, when, then } from 'cucumber-tsflow'
import { Config } from './config'
import { RideRequestRepoStub } from '../../src/adapters/driven/rideRequestRepo.stub'
import { EventGatewayStub } from '../../src/adapters/driven/eventGateway.stub'
import { expect } from 'chai'

@binding([Config])
class RideRequestSteps {
  private rideRequestRepo: RideRequestRepoStub
  private eventGateway: EventGatewayStub

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
  private onRideRequestCreatedEvent(id: string, callback: any) {
    callback(null, 'pending')
  }
}
