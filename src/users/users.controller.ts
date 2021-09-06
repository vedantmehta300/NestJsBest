import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Query,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { take, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  LookupRequestUserDto,
  RequestUserDto,
  GettingUserInterest,
} from './request.user.dto';
import { ResponseUserDto } from './response.user.dto';
import { User } from '@app/models/User';
import { QueryRunner } from 'typeorm';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { UserInterestdto } from './userinterest.dto';
// import { User } from './users.interface';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  @ApiQuery({
    type: RequestUserDto,
  })
  getAllUsers(@Query() request: RequestUserDto): Promise<Observable<User[]>> {
    // return this.userService.findAll(request).pipe(take(10), toArray());
    return this.userService.findAll(request);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log('-------------- in controller ');
    const result = this.userService.findById(id);
    console.log('result here', result);
    return result;
  }

  @Post('getByUserInterest')
  getDetailsById(@Body() data: GettingUserInterest): Promise<User> {
    return this.userService.GettingIddata(data);
  }

  @Post('lookup')
  @ApiBody({
    type: LookupRequestUserDto,
    description:
      'lat, long and range param required. range is in KM.size default 10. skip default 0, phone  for filter.',
  })
  getByPostLookup(@Body() request: LookupRequestUserDto): Promise<User[]> {
    // const { size, skip, keyword, phone, ageFrom, ageTo } = request;
    return this.userService.findForLookup(request);
  }

  @Get('lookup')
  getByLookup(@Req() request: any): Promise<any> {
    const { size, skip, keyword, phone, ageFrom, ageTo } = request.query;
    return this.userService.findOne({
      size,
      skip,
      keyword,
      phone,

      ageFrom,
      ageTo,
    });
  }

  @Get('getByPhone/:phone')
  getUserByPhone(
    @Param('phone', ParseIntPipe) phone: string,
  ): Promise<Observable<any>> {
    return this.userService.findByPhone(phone);
  }

  @Post('')
  createUser(@Body() user: any): Promise<any> {
    return this.userService.create(user);
  }

  @Post('userInterest')
  UserInterestPost(@Body() body: UserInterestdto): Promise<any> {
    return this.userService.userInterestPost(body);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<Observable<any[]>> {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number): Observable<boolean> {
    return this.userService.deleteById(id);
  }

  @Delete('userPhotos/:id')
  async deleteUserPhotoById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return await this.userService.deleteUserPhotoById(id);
  }
}
