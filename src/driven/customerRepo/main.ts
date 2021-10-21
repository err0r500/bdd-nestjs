import { Customer } from 'src/domain/customer'
import { CustomerRepo } from 'src/logic/abstractClasses'

export class CustomerRepoPostgres implements CustomerRepo {
  save(c: Customer) {
    return undefined
  }

  getByID(id: string): Customer | null {
    return undefined
  }
}
