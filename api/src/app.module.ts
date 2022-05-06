import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/user.role';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: `cms-blog`,
      username: 'root',
      password: 'root',
      port: 3306,
      host: 'localhost',
      autoLoadEntities: true,
      synchronize: true, // for production --> not use
    }),
    PostModule,
    CategoryModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
