import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class LookupRequestUserDto {
  @IsNumber()
  @Type(() => Number)
  lat: number;

  @IsNumber()
  @Type(() => Number)
  long: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  range: number;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsString()
  phone?: string;
}
//   @IsOptional()
//   @IsString()
//   username?: string;
// }

export class RequestUserDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  lat: number;

  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  long: number;

  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber()
  range: number;
}

export class GettingUserInterest {
  @IsNotEmpty()
  readonly userId: number;
}
