import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { SocialNetworksService } from './social-networks.service';
import { CreateSocialNetworkDto } from './create-social-network.dto';
import { UpdateSocialNetworkDto } from './update-social-network.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('api/social-networks')
export class SocialNetworksController {
  constructor(private readonly socialNetworksService: SocialNetworksService) {}

  @Post()
  create(
    @Body() createSocialNetworkDto: CreateSocialNetworkDto,
  ): Promise<UpdateSocialNetworkDto> {
    return this.socialNetworksService.create(createSocialNetworkDto);
  }

  @Get()
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'if need user vise need to pass userId',
  })
  findAll(@Query('userId') userId?: number): Promise<UpdateSocialNetworkDto[]> {
    return this.socialNetworksService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UpdateSocialNetworkDto> {
    return this.socialNetworksService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSocialNetworkDto: CreateSocialNetworkDto,
  ): Promise<UpdateSocialNetworkDto> {
    return this.socialNetworksService.update(+id, updateSocialNetworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialNetworksService.remove(+id);
  }
}
