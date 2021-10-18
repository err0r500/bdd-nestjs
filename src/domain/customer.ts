export class Customer {
  readonly id: string
  private firstName: string
  private lastName: string

  constructor(id: string, firstName: string, lastName: string) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
  }
}
