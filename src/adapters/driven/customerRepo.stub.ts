import { Customer } from '../../domain/customer'
import { CustomerRepo } from '../../logic/abstractClasses'

export class CustomerRepoStub implements CustomerRepo {
  private repo: Array<Customer>

  constructor() {
    this.repo = []
  }

  save(c: Customer): void {
    this.repo.push(c)
  }

  getByID(id: string): Customer | null {
    const resp = this.repo.filter((customer) => customer.id === id)
    if (resp.length == 0) {
      return null
    }
    return resp[0]
  }

  all(): Array<Customer> {
    return this.repo
  }
}
