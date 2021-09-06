import { InterestCreateDto } from 'src/constants/createInterest.dto';
import { InterestDto } from 'src/constants/interest.dto';

export const toInterestDto = (data: InterestCreateDto): InterestDto => {
  const { title, parent_id } = data;

  const todoDto: InterestDto = { title, parent_id };
  return todoDto;
};
