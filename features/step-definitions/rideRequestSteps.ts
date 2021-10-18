import { binding, when, then } from 'cucumber-tsflow'
import { Config } from './config'
import { RideRequestRepoStub } from 'src/adapters/driven/rideRequestRepo.stub'
import { expect } from 'chai'

@binding([Config])
class RideRequestSteps {
  private rideRequestRepo: RideRequestRepoStub
  private rideRequestID: string

  constructor(config: Config) {
    this.rideRequestRepo = config.rideRequestRepo
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
  private onRideRequestCreatedEvent(status: string, callback: any) {
    callback(null, 'pending')
  }

  @when(/the RideRequestCreatedEvent "([^"]*)" is received/)
  private onRideRequestCreatedEventReceived(id: string, callback: any) {
    callback(null, 'pending')
  }
}
