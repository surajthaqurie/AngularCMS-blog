import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUserGuard } from './current-user.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from './user.decorator';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async userLogin(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const { token, user } = await this.authService.login(userLoginDto);

    res.cookie('IsAuthenticated', true, {
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    return res.send({ success: true, user });
  }

  @Post('register')
  async userRegister(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // Route to return current authentication state
  @Get('auth-status')
  @UseGuards(CurrentUserGuard)
  authStatus(@CurrentUser() user: User) {
    return { status: !!user, user };
  }

  // Route to logout the user
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('Authentication');
    res.clearCookie('IsAuthenticated');

    return res.status(200).send({ success: true });
  }
}
