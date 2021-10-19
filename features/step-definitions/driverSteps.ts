import { DataTable } from '@cucumber/cucumber'
import { Config } from './config'
import { binding, given, then } from 'cucumber-tsflow'
import { expect } from 'chai'
import { DriverRepoStub } from '../stubs/driverRepo.stub'
import { Driver } from '../../src/domain/driver'
import { NotificationGatewayStub } from '../stubs/notificationGateway.stub'

@binding([Config])
class DriverSteps {
  private driverRepo: DriverRepoStub
  private notificationGateway: NotificationGatewayStub

  constructor(config: Config) {
    this.driverRepo = config.driverRepo
    this.notificationGateway = config.notificationGateway
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
    if (raw === '-') {
      expect(this.driverRepo.getNearby().length).to.eq(0)
    }
  }

  @then(/drivers are notified : "([^"]*)"/)
  private driversNotified(notified: string) {
    if (toBool(notified)) {
      const driversNearby = this.driverRepo.getNearby()

      driversNearby.map((driver: Driver) => {
        const driverNotifs = this.notificationGateway
          .getDriverNotifs()
          .filter((to: string) => to == driver.id)
        expect(driverNotifs.length).to.eq(1)
      })

      expect(driversNearby.length).to.eq(
        this.notificationGateway.getDriverNotifs().length
      )
      return
    }

    expect(this.notificationGateway.getDriverNotifs().length).to.eq(0)
  }
}

function toBool(s: string): boolean {
  return s === 'true'
}
