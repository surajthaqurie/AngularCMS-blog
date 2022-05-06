import {
  Controller,
  Req,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UseInterceptors,
  Get,
  Post,
  Query,
  UseGuards,
  UploadedFile,
  ClassSerializerInterceptor,
  Res,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Express, Response } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('post')
@UseInterceptors(ClassSerializerInterceptor) //   @Exclude() : class-transformer
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'create',
    resource: 'posts',
  })
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
    @CurrentUser() user: User,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // console.log(user);
    return this.postService.create(createPostDto, user as User);
  }

  @Get()
  findAll(@Query() query: any, @Req() req: Request) {
    return this.postService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postService.findBySlug(slug);
  }

  @Post('upload-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname
            .split('.')[0]
            // .replace(' ', '')
            .toLowerCase();
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('file is not a image');
    } else {
      const response = {
        filePath: `http://localhost:5000/post/pictures/${file.filename}`,
      };
      return response;
    }
  }
  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, {
      root: './uploads',
    });
  }

  @Patch(':slug')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'update',
    resource: 'posts',
  })
  update(@Param('slug') slug: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(slug, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'delete',
    resource: 'posts',
  })
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
