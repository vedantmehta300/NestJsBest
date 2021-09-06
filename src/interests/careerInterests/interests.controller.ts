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
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Req,
  Request
} from '@nestjs/common';
import { InterestCreateDto } from 'src/constants/createInterest.dto';
import { InterestDto } from 'src/constants/interest.dto';
import { InterestListDto } from 'src/constants/interestList.dto';
import { ResponseStatus } from 'src/constants/types';
import { toPromise } from 'src/shared/utils';
import { InterestsService } from './interests.service';

@Controller('api/interests/career')
export class InterestsController {
  constructor(private readonly interestService: InterestsService) {}

  @Get()
  async findAll(@Req() request: any): Promise<InterestListDto> {
    const {
      size,
      skip,
      keyword
    } = request.query;
    console.debug(' getting request in common findAll controller')
    const response = await this.interestService.getAllInterest({size, skip, keyword});

    return toPromise({ ...response });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InterestDto> {
    return await this.interestService.getOneInterest(id);
  }

  @Get('/byParentId/:parentId')
  async findByParentid(@Param('parentId') parentId: string,@Req() request: any ): Promise<InterestDto> {
    const {
      size,
      skip,
    } = request.query;
    return await this.interestService.getByParentId(parentId, {size, skip});
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() todoCreateDto: InterestCreateDto): Promise<ResponseStatus> {
    console.debug('interest controller create, body', todoCreateDto);

    const result = await this.interestService.createInterest(todoCreateDto);
    if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
      }
    return result;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() interestDto: InterestDto,
  ): Promise<ResponseStatus> {
    interestDto.id = id;
    const result = await this.interestService.updateInterest(interestDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<ResponseStatus> {
    return await this.interestService.destoryInterest(id);
  }
}
