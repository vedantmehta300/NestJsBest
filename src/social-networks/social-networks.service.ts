import { SocialNetwork } from '@app/models/User/SocialNetwork.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateSocialNetworkDto } from './create-social-network.dto';
import { UpdateSocialNetworkDto } from './update-social-network.dto';

@Injectable()
export class SocialNetworksService {
  constructor(
    @InjectRepository(SocialNetwork)
    private socialNetworkRepository: Repository<SocialNetwork>,
  ) {}

  async create(
    createSocialNetworkDto: CreateSocialNetworkDto,
  ): Promise<SocialNetwork> {
    const { userId, type, link } = createSocialNetworkDto;
    const scInDb = await this.socialNetworkRepository.findOne({
      where: { userId, type },
    });
    if (scInDb) {
      throw new HttpException(
        'Social network already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const sc: SocialNetwork = await this.socialNetworkRepository.create({
      userId,
      type,
      link,
    });
    await this.socialNetworkRepository.save(sc);
    return sc;
  }

  async findAll(userId?: number) {
    if (userId) {
      return await this.socialNetworkRepository.find({ where: { userId } });
    }
    return await this.socialNetworkRepository.find();
  }

  findOne(id: number) {
    return this.socialNetworkRepository.findOne({ id });
  }

  async update(
    id: number,
    updateSocialNetworkDto: CreateSocialNetworkDto,
  ): Promise<SocialNetwork> {
    const { userId, type, link } = updateSocialNetworkDto;
    const scInDb = await this.socialNetworkRepository.findOne({
      where: { userId, type, id: Not(id) },
    });
    if (scInDb) {
      throw new HttpException(
        'Social network already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.socialNetworkRepository.update(
      { id },
      {
        userId,
        type,
        link,
      },
    );
    return await this.socialNetworkRepository.findOne({ id });
  }

  remove(id: number) {
    return this.socialNetworkRepository.delete({ id });
  }
}
