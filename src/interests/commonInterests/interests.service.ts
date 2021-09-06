import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { toPromise } from 'src/shared/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import InterestsEntity from '../../models/Interests/commonInterest.entity';
import { ResponseStatus } from 'src/constants/types';
import { InterestCreateDto } from 'src/constants/createInterest.dto';
import { InterestDto } from 'src/constants/interest.dto';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(InterestsEntity)
    private interestsRepository: Repository<InterestsEntity>,
  ) {}

  async getAllInterest(query) {
    const take = query.size || 100;
    const skip = query.skip || 0;
    const keyword = query.keyword || '';
    console.debug(' getting request in  findAll: ' + this.constructor.name);
    const [result, total] = await this.interestsRepository.findAndCount({
      where: { title: Like('%' + keyword + '%') },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      total,
    };
  }

  async getOneInterest(id: string): Promise<InterestsEntity> {
    const interest = this.interestsRepository.findOne(id);

    if (!interest) {
      throw new HttpException(
        `Interest item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(interest);
  }

  async getByParentId(parentId: string): Promise<any> {
    const parentInterest = await this.interestsRepository.findOne({
      id: parentId,
    });
    const [result, total] = await this.interestsRepository.findAndCount({
      parent: parentInterest,
    });

    if (!parentInterest) {
      throw new HttpException(
        `Such parent Interest item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      data: result,
      total,
    };
  }

  async createInterest(
    interestDto: InterestCreateDto,
  ): Promise<ResponseStatus> {
    let status: ResponseStatus = {
      success: true,
      message: 'interest created',
    };

    let response;
    const { title, parent_id } = interestDto;
    console.debug('in interest service create', {
      title,
      parent_id,
      interestDto,
    });
    try {
      const parentInterest = await this.interestsRepository.findOne({
        where: { id: parent_id },
      });
      console.debug('found parrent interest', parentInterest);
      const newInterest: InterestsEntity = {
        title,
        parent: parentInterest ? parentInterest : null,
      };

      const createdInterest = await this.interestsRepository.save(newInterest);

      console.debug(' --- created interest', createdInterest);

      response = {
        data: createdInterest,
      };

      status = {
        ...status,
        message: `interest <<${title}>> was created`,
      };
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
      console.error('Error', err);
    }
    return { ...response, ...status };
  }

  async destoryInterest(id: string): Promise<ResponseStatus> {
    const result = await this.interestsRepository.delete(id);
    console.debug('---- DELETED result', result);
    const status: ResponseStatus = {
      success: true,
      message: 'interest was deleted',
    };
    return {
      ...status,
      data: {
        id,
      },
    };
  }

  async updateInterest(interestDto: InterestDto): Promise<ResponseStatus> {
    let status: ResponseStatus = {
      success: true,
      message: 'interest created',
    };

    const { title, parent_id, id } = interestDto;
    let updatedInterest;

    try {
      const parentInterest = await this.interestsRepository.findOne({
        where: { id: parent_id },
      });
      console.debug('found parrent interest', parentInterest);
      const interestToUpdate: InterestsEntity = {
        id,
        title,
        parent: parentInterest ? parentInterest : null,
      };

      updatedInterest = await this.interestsRepository.update(
        { id },
        interestToUpdate,
      );

      console.debug('in updated interest service', {
        updatedInterest,
        interestToUpdate,
      });

      status = {
        ...status,
        message: `interest <<${title}>> was updated`,
      };
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
      console.error('Error', err);
    }
    return { ...status, data: { ...updatedInterest, id } };
  }
}
