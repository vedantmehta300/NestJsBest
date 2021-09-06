import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class UserInterestdto {
  @IsOptional()
  id?: number;

  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsEnum(['common', 'career', 'family', 'sport', 'travel'])
  category: string;

  @IsNotEmpty()
  @Min(1)
  interestId: number;

  @IsNotEmpty()
  @Min(1)
  userId: number;

  @IsNotEmpty()
  @MaxLength(200, {
    message: " The description can't accept more than 200 characters ",
  })
  description: string;
}
