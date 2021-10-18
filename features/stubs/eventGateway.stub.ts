import { EventGateway } from '../../src/logic/abstractClasses'
import { RideRequestCreatedEvent } from '../../src/domain/rideRequest'

export class EventGatewayStub implements EventGateway {
  private eventBus: Array<any>

  constructor() {
    this.eventBus = []
  }

  emit(e: RideRequestCreatedEvent) {
    this.eventBus.push(e)
  }

  all(): Array<any> {
    return this.eventBus
  }
}
