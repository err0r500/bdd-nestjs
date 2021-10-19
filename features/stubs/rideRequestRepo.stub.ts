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

  getByID(id: string): RideRequest | undefined {
    return this.repo.filter((rr: RideRequest) => rr.id === id)?.[0]
  }

  all(): Array<RideRequest> {
    return this.repo
  }
}
