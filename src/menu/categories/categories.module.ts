import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, SERVICES } from 'src/config';

@Module({
  controllers: [CategoriesController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.MENU_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.menuMicroservice.host,
          port: envs.menuMicroservice.port
        }
      },
    ])
  ],
})
export class CategoriesModule {}
