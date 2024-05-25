import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(ReviewEntity) 
  private readonly reviewsRepository: Repository<ReviewEntity> ,
  private productService:ProductsService) {}


  async create(createReviewDto: CreateReviewDto , currentUser:UserEntity):Promise<ReviewEntity> {
    const product = await this.productService.findOne(createReviewDto.ProductId);
    let review = await this.findByUserAndProduct(currentUser.id , product.id);
    if(!review) {
      review = this.reviewsRepository.create(createReviewDto);
      review.user = currentUser;
      review.product = product;
    }else{
      review.comment = createReviewDto.comment;
      review.ratings =  createReviewDto.ratings;
    }

    return await this.reviewsRepository.save(review);
  }

  findAll() {
    return `This action returns all reviews`;
  }

  async findAllProduct(id:number):Promise<ReviewEntity[]>{

    const product = await this.productService.findOne(id);
    return await this.reviewsRepository.find({
      where:{
        product:{id},
      },
      relations:{
        user:true,
        product:{
          category:true,
        }
      }
    })

    }

  async findOne(id: number):Promise<ReviewEntity> {
    const review = await this.reviewsRepository.findOne({
      where:{
        id : id,
      },
      relations:{
        user:true,
        product:{
          category:true,

        }
      }
    });
    if(!review) throw new NotFoundException("This Product is not found");
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const review = await this.findOne(+id);
    return await this.reviewsRepository.remove(review);
  }

  async  findByUserAndProduct(userId:number , productId:number) {
    return await this.reviewsRepository.findOne({
      where:{
        user:{
          id: userId,
        },
        product:{
          id: productId,
        }
      },relations:{
        user:true,
        product:{
          category:true,
        }
      }
    })
  }
    
  }

