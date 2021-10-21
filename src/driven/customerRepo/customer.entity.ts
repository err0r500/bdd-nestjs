import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { RepoEntity } from 'src/logic/abstractClasses'
import { Customer } from 'src/domain/customer'

@Entity()
export class CustomerDB extends RepoEntity<Customer> {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  toDomain(): Customer {
    return new Customer(this.id, this.firstName, this.lastName)
  }

  fromDomain(c: Customer) {
    this.id = c.id
  }
}
