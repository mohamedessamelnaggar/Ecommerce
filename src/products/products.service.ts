import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository:Repository<ProductEntity> 
  , private readonly categoryService:CategoriesService ){}

  async create(createProductDto: CreateProductDto , currentUser:UserEntity ):Promise<ProductEntity> {
    const category = await this.categoryService.findOne(+createProductDto.categoryId);
    const product = await this.productRepository.create(createProductDto);
    product.addedBy = currentUser;
    product.category = category;

    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number):Promise<ProductEntity> {

    const product =  await this.productRepository.findOne({
      where:{id: id},
      relations: {
        addedBy : true ,
        category : true
      },
      select: {
        addedBy :{
          id : true ,
          email : true ,
          name : true 
        } ,
        category : {
          id : true ,
          title : true ,
          description : true ,
        }
      }
    });
    if(!product) throw new NotFoundException("Product is not exist");
    return product;
  }

  async update(id: number, updateProductDto:Partial<UpdateProductDto> , currentUser:UserEntity ):Promise<ProductEntity> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    product.addedBy=currentUser;
    if(updateProductDto.categoryId){
      const category = await this.categoryService.findOne(
        +updateProductDto.categoryId
      );
      product.category=category;
    }
    return await this.productRepository.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
