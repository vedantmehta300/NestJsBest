import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsPhoneNumber,
  IsIn,
} from 'class-validator';

export type Gender = 'male' | 'female' | 'other';

export const Genders: Gender[] = ['male', 'female', 'other'];

export class RegisterUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsIn(Genders)
  gender: Gender;

  @IsNotEmpty()
  locationLatitude: string;

  @IsNotEmpty()
  locationLongitude: string;

  @IsNotEmpty()
  birthDate: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;

  @IsNotEmpty()
  @MinLength(4, { message: ' The min length of password is 8 ' })
  @MaxLength(20, {
    message: " The password can't accept more than 20 characters ",
  })
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/,
  //     { message: " A password at least contains one numeric digit, one supercase char and one lowercase char" }
  // )
  readonly password: string;

  // @IsNotEmpty()
  // readonly firstName?: string;
  // @IsNotEmpty()
  // readonly lastName?: string;
}
