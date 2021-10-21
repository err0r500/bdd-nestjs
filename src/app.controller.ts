import { Controller, Get } from '@nestjs/common'
import { Dummy } from './logic/dummy'

@Controller()
export class AppController {
  constructor(private readonly dummy: Dummy) {}

  @Get()
  getHello() {
    return this.dummy.handle('id')
  }
}
