import { Driver } from '../../domain/driver'
import { DriverRepo } from '../../logic/abstractClasses'

export class DriverRepoStub extends DriverRepo {
  private repo: Array<Driver>
  private nearby: Array<string>

  constructor() {
    super()
    this.repo = []
    this.nearby = []
  }

  save(c: Driver): void {
    this.repo.push(c)
  }

  getNearby(): Array<Driver> {
    return this.nearby.flatMap((id: string) =>
      this.repo.filter((driver: Driver) => driver.id === id)
    )
  }

  all(): Array<Driver> {
    return this.repo
  }

  addDriverNearby(id: string) {
    this.nearby.push(id)
  }
}
