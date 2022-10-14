import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Redirect} from '@nestjs/common';
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {ProductsService} from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Get()
  // @Redirect('https://google.com', 301)
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return 'Getting one ' + id;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProduct: CreateProductDto) {
    return `Title: ${createProduct.title} Price: ${createProduct.price}`;
  }

  @Put(':id')
  update(@Body() updateProduct: UpdateProductDto, @Param('id') id: string) {
    return `Price: ${updateProduct.price} Id ${id}`;
  }
}
