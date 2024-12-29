import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';


@Controller('categories')
export class CategoriesController {
  constructor() {}

  @Post()
  createCategory(){
    return 'Create a category';
  }

  @Get()
  getAllCategories(){
    return 'Get all categories';
  }

  @Get(':id')
  getCategoryById(@Param('id') id:string)
  {
    return 'Ger category bye id' + id
  }  

  @Delete(':id')
  deleteCategory(@Param('id') id:string){
    return 'Delete category by id ' + id
  }

  @Patch(':id')
  patchCategory(
    @Param('id') id:string,
    @Body() body : any
  ){
    return ('Patch category by id ' + id)
  }

}
