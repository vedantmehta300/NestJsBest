import { RegisterUserDto } from './register.dto';
import { ResponseUserDto } from './response.user.dto';
import { User as UserEntity } from '../models/User/User.entity';

export const toUserDto = (data: UserEntity): RegisterUserDto => {
  const {
    password,

    email,
    phone,
    firstName,
    lastName,
    gender,
    locationLatitude,
    locationLongitude,
    birthDate,
  } = data;
  const userDto: RegisterUserDto = {
    email,
    password,
    phone,
    firstName,
    lastName,
    gender,
    locationLatitude,
    locationLongitude,
    birthDate,
  };
  return userDto;
};

export const toUserResponseDto = (data: UserEntity): ResponseUserDto => {
  const { email, phone } = data;
  const userDto: ResponseUserDto = { email, phone };
  return userDto;
};

export const toUsersResponseDto = (data: UserEntity[]): ResponseUserDto[] => {
  const result = data.map(({ email, phone, geo }) => {
    return { email, phone, geo };
  });
  const userDto: ResponseUserDto[] = result;
  return userDto;
};
