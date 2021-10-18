import { EventGateway } from '../../logic/abstractClasses'
import { RideRequestCreatedEvent } from '../../domain/rideRequest'

export class EventGatewayStub implements EventGateway {
  private eventBus: Array<any>

  constructor() {
    this.eventBus = []
  }

  emit(e: RideRequestCreatedEvent) {
    this.eventBus.push(e)
  }
}
