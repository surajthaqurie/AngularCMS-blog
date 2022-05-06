import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, user: User) {
    // make instance for db hooks
    const post = new Post();

    Object.assign(post, createPostDto);

    // post.userId = 1;
    post.userId = user.id;

    this.repo.create(post);
    return await this.repo.save(post);
  }

  // http://localhost:5000/post?sort=asc&title=firstpost
  async findAll(query?: string) {
    const myQuery = await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.user', 'user');

    // check if query is present or not
    if (!(Object.keys(query).length == 0) && query.constructor === Object) {
      const queryKeys = Object.keys(query); // get the keys of the query string

      // check if title key is present
      if (queryKeys.includes('title')) {
        myQuery.where('post.title LIKE :title', {
          title: `%${query['title']}%`,
        });
      }

      // check if the sort key is present, we will sort by Title field only
      if (queryKeys.includes('sort')) {
        myQuery.orderBy('post.title', query['sort'].toUpperCase()); // ASC or DESC
      }

      // check if category is present, show  only selected category items
      if (queryKeys.includes('category')) {
        myQuery.andWhere('category.title = :cat', {
          cat: query['category'],
        });
      }

      return await myQuery.getMany();
    } else {
      return await myQuery.getMany();
    }
  }

  async findOne(id: number) {
    const post = await this.repo.findOne(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    return post;
  }

  async findBySlug(slug: string) {
    try {
      const post = await this.repo.findOneOrFail({ slug });
      return post;
    } catch (error) {
      throw new BadRequestException(`Post with slug ${slug} not found`);
    }
  }

  async update(slug: string, updatePostDto: UpdatePostDto) {
    const post = await this.repo.findOne({ slug });
    if (!post) {
      throw new BadRequestException(`Post not found`);
    }

    post.modifiedOn = new Date(Date.now());
    post.category = updatePostDto.category;

    Object.assign(post, updatePostDto);
    return this.repo.save(post);
  }

  async remove(id: number) {
    const post = await this.repo.findOne(id);
    if (!post) {
      throw new BadRequestException(`Post not found`);
    }

    await this.repo.remove(post);

    return { success: true, post };
  }
}
