import { DataTable } from '@cucumber/cucumber'
import { Config } from './config'
import { binding, given, then } from 'cucumber-tsflow'
import { expect } from 'chai'
import { DriverRepoStub } from '../../src/adapters/driven/driverRepo.stub'
import { Driver } from '../../src/domain/driver'

@binding([Config])
class DriverSteps {
  private driverRepo: DriverRepoStub

  constructor(config: Config) {
    this.driverRepo = config.driverRepo
  }

  @given(/^some drivers exist:$/)
  private driversExist(dataTable: DataTable): void {
    dataTable.hashes().map((r: any) => {
      const driver = new Driver(r.id)
      this.driverRepo.save(driver)

      expect(this.driverRepo.all()).to.contain(driver)
    })
    return
  }

  @given(/^some drivers are available near start "([^"]*)"/)
  private driversNearby(raw: string) {
    raw
      .split(',')
      .filter((id: string) => id !== '-')
      .map((id: string) => {
        this.driverRepo.addDriverNearby(id)
      })
  }

  @then(/drivers are "([^"]*)"/)
  private driversNotified(status: string, callback) {
    callback(null, 'pending')
  }
}
