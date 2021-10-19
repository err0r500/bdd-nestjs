export class DomainEvent {
  private timestamp: number

  constructor() {
    this.timestamp = Date.now()
  }
}
