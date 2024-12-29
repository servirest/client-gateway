import { Module } from '@nestjs/common';
import { CategoriesModule } from './menu/categories/categories.module';


@Module({
  imports: [CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
