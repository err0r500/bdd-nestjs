import { Injectable } from '@nestjs/common'
import { CustomerRepo } from '../logic/abstractClasses'

@Injectable()
export class Dummy {
  constructor(private readonly customerRepo: CustomerRepo) {}

  public handle(id: string) {
    this.customerRepo.getByID(id)
  }
}
