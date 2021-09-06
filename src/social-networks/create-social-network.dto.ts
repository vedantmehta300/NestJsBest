import { IsEnum, IsNotEmpty, MaxLength, Min } from 'class-validator';

export class CreateSocialNetworkDto {
  @IsNotEmpty()
  @Min(1)
  userId: number;

  @IsNotEmpty()
  @IsEnum(['facebook', 'instagram', 'youtube', 'twitter'])
  type: string;

  @IsNotEmpty()
  @MaxLength(200, {
    message: " The link can't accept more than 200 characters ",
  })
  link: string;
}
