import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CustomerRepo } from './logic/abstractClasses'
import { CustomerRepoPostgres } from './driven/customerRepo/main'
import { CustomerDB } from './driven/customerRepo/customer.entity'
import { CreateRideRequest } from './logic/createRideRequest'
import { Dummy } from './logic/dummy'

const customerRepoProvider = {
  provide: CustomerRepo,
  useClass: CustomerRepoPostgres
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [CustomerDB],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [Dummy, customerRepoProvider]
})
export class AppModule {}
