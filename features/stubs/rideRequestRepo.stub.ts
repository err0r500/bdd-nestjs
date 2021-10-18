import { RideRequest } from '../../src/domain/rideRequest'
import { RideRequestRepo } from '../../src/logic/abstractClasses'

export class RideRequestRepoStub extends RideRequestRepo {
  private repo: Array<RideRequest>

  constructor() {
    super()
    this.repo = []
  }

  save(c: RideRequest) {
    this.repo.push(c)
  }

  all(): Array<RideRequest> {
    return this.repo
  }

  get(id: string): RideRequest | undefined {
    return this.repo.filter((rr: RideRequest) => rr.id === id)?.[0]
  }
}
