import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { SERVICES } from '../../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(@Inject(SERVICES.MENU_SERVICE) private readonly categoriesClient : ClientProxy ) {}

  @Post()
  createCategory(@Body()  createCategoryDto : CreateCategoryDto){
    return this.categoriesClient.send({cmd: 'create_category'}, createCategoryDto)
  }

  @Get()
  getAllCategories(@Query()paginationDto : PaginationDto){
    return this.categoriesClient.send({cmd: 'find_all_categories'} , paginationDto)
  }

  @Get(':id')
  async getCategoryById(@Param('id') id:string)
  {
    this.categoriesClient.send({cmd: 'find_category_by_id'}, id).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
    /* try { //otra forma de hacerlo
      const category = await firstValueFrom(
        this.categoriesClient.send({cmd: 'find_category_by_id'}, id)
      )
      return category
    } catch (error) {
      throw new RpcException(error)
    } */
  }  

  @Delete(':id')
  deleteCategory(@Param('id') id:string){
    return this.categoriesClient.send({cmd: 'remove_category'}, {id}).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }

  @Patch(':id')
  patchCategory(@Param('id', ParseIntPipe) id:number, @Body() updateCategoryDto : UpdateCategoryDto){
    return this.categoriesClient.send({ cmd: 'update_category' }, {id, updateCategoryDto}).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }

}
