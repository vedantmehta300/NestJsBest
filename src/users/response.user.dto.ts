import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseUserDto {
  //@Expose()
  //readonly username: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly phone: string;

  @Exclude()
  readonly geo?: string;
}
