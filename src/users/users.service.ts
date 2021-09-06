import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Observable, from, of } from 'rxjs';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { LoginUserDto } from './loginUser.dto';
import { toUserDto, toUserResponseDto, toUsersResponseDto } from './mapper';
import { RegisterUserDto } from './register.dto';
import { User } from '../models/User/User.entity';
import { compare, hash } from 'bcrypt';
import 'dotenv/config';
import { ResponseUserDto } from './response.user.dto';
import { UserPhoto } from '@app/models/User';
import { LookupRequestUserDto, RequestUserDto } from './request.user.dto';
import { SocialNetwork } from '@app/models/User/SocialNetwork.entity';
import { UserInterest } from '../models/User/UserInterest.entity';
import { UserInterestdto } from './userinterest.dto';
import { GettingUserInterest } from './request.user.dto';
//todo
// const secret = secret; // process.env.SECRETKEY,
export const saltRounds = process.env.SALT_ROUNDS;
// import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserPhoto)
    private userPhotosRepository: Repository<UserPhoto>,
    @InjectRepository(SocialNetwork)
    private socialNetworkRepository: Repository<SocialNetwork>,
    @InjectRepository(UserInterest)
    private userInterestRepository: Repository<UserInterest>,
  ) {}

  async userInterestPost(Hpost: UserInterestdto): Promise<any> {
    const UI = await this.userInterestRepository.create({
      category: Hpost.category,
      description: Hpost.description,
      interestId: Hpost.interestId,
      userId: Hpost.userId,
    });
    return await this.userInterestRepository.save(UI);
  }

  async findAll(request: RequestUserDto): Promise<Observable<User[]>> {
    const { lat = 0, long = 0, range = 1 } = request;
    console.log(lat, long, range);
    const user: User[] = await this.usersRepository
      .createQueryBuilder('user')
      .select([
        '*',
        '(6371 * acos( cos( radians(:lat) ) * cos( radians( locationLatitude ) ) * cos( radians( locationLongitude ) - radians(:long) ) + sin( radians(:lat) ) * sin( radians( locationLatitude ) ) ) ) AS geo',
      ])
      .having('geo < :range')
      .orderBy('geo', 'ASC')
      .setParameters({
        long,
        lat,
        range: range * 1000, //KM conversion
      })
      .getRawMany();
    const users = [];
    const photos = [];
    const sl = [];
    const uinterests = [];
    for (const u of user) {
      photos.push(this.userPhotosRepository.find({ where: { userId: u.id } }));
      sl.push(this.socialNetworkRepository.find({ where: { userId: u.id } }));
      uinterests.push(this.getUserInterest(u.id));
    }

    const userPhotos = await Promise.all(photos);
    const socialMediaLinks = await Promise.all(sl);
    const userInterests = await Promise.all(uinterests);

    for (let i = 0; i < user.length; i++) {
      user[i]['userPhotos'] = userPhotos[i];
      user[i]['socialMediaLinks'] = socialMediaLinks[i];
      user[i]['interests'] = userInterests[i];
      users.push({
        ...user[i],
        isAdmin: Boolean(user[i].isAdmin),
        isActive: Boolean(user[i].isActive),
        isOnline: Boolean(user[i].isOnline),
      });
    }
    // console.log(users);
    return from([users]);
<<<<<<< HEAD
=======
  }

  async GettingIddata(data: GettingUserInterest): Promise<User> {
    const userid = await this.userInterestRepository.query(
      `SELECT * FROM user WHERE id IN(SELECT userId FROM user_interest WHERE row(category,interestId) IN
      (SELECT category,interestId From user_interest WHERE userId=${data.userId} ) AND userId != ${data.userId})`,
    );
    return userid;
>>>>>>> 525d72a79d317247c5ebef3309c4b2f36e95a716
  }

  async findForLookup(request: LookupRequestUserDto): Promise<User[]> {
    const user = await this.getUserUsingLatLong(request);

    const users = [];
    const photos = [];
    const sl = [];
    const uinterests = [];
    for (const u of user) {
      photos.push(this.userPhotosRepository.find({ where: { userId: u.id } }));
      sl.push(this.socialNetworkRepository.find({ where: { userId: u.id } }));
      uinterests.push(this.getUserInterest(u.id));
    }

    const userPhotos = await Promise.all(photos);
    const socialMediaLinks = await Promise.all(sl);
    const userInterests = await Promise.all(uinterests);
    console.log(userPhotos);
    console.log(socialMediaLinks);
    for (let i = 0; i < user.length; i++) {
      user[i]['userPhotos'] = userPhotos[i];
      user[i]['socialMediaLinks'] = socialMediaLinks[i];
      user[i]['interests'] = userInterests[i];
      users.push({
        ...user[i],
        isAdmin: Boolean(user[i].isAdmin),
        isActive: Boolean(user[i].isActive),
        isOnline: Boolean(user[i].isOnline),
      });
    }
    console.log(users);
    return users;
  }

  async findOne(options?: object): Promise<ResponseUserDto> {
    const orFilters = Object.keys(options).map((key: any) => {
      return {
        [key]: options[key],
      };
    });
    //  //OR:
    //   this.usersRepository.find({
    //     where:[
    //         {name:"john"},
    //         {lastName: "doe"}
    //     ]
    //   })
    const user = await this.usersRepository.findOne({ where: orFilters });
    return toUserResponseDto(user);
  }

  async findByPhone(phone?: string): Promise<Observable<ResponseUserDto>> {
    const user = await this.usersRepository.findOne({ phone });
    return of(toUserResponseDto(user));
  }

  async findByLogin({
    phone,
    password,
  }: LoginUserDto): Promise<ResponseUserDto> {
    const user = await this.usersRepository.findOne({ where: { phone } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await compare(password, user.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return toUserResponseDto(user);
  }

  async findByPayload({ phone }: any): Promise<ResponseUserDto> {
    return await this.findOne({
      where: { phone },
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(userDto: RegisterUserDto): Promise<ResponseUserDto> {
    const {
      password,
      phone,
      firstName,
      lastName,
      gender,
      locationLatitude,
      locationLongitude,
      birthDate,
    } = userDto;
    // check if the user exists in the db
    const userInDb = await this.usersRepository.findOne({
      where: { phone },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const email = userDto.email || null;
    const user: User = await this.usersRepository.create({
      password,
      phone,
      firstName,
      lastName,
      gender,
      locationLatitude,
      locationLongitude,
      birthDate,
      email,
    });
    await this.usersRepository.save(user);
    return toUserResponseDto(user);
  }

  async findById(id: number): Promise<User> {
    const found = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: ['userPhotos', 'socialMediaLinks'],
    });
    const uinterests = await this.getUserInterest(found.id);

    found['interests'] = uinterests;

    return found;
  }

  async update(id: number, data: User): Promise<any> {
    if (data.userPhotos) {
      for (const photo of data.userPhotos) {
        if (
          photo.id &&
          photo.photo &&
          (await this.userPhotosRepository.findOne({ id: photo.id }))
        ) {
          await this.userPhotosRepository.update(
            { id: photo.id },
            {
              userId: id,
              photo: photo.photo,
            },
          );
        } else {
          const userPhoto: UserPhoto = await this.userPhotosRepository.create({
            userId: id,
            photo: photo.photo,
          });
          await this.userPhotosRepository.save(userPhoto);
        }
      }
      delete data['userPhotos'];
    }

    // if (data.locationLatitude && data.locationLongitude) {
    //   const pointObject: Point = {
    //     type: 'Point',
    //     coordinates: [+data.locationLongitude, +data.locationLatitude],
    //   };
    //   data.location = pointObject;
    if (data && Object.keys(data).length) {
      let user = <Partial<User>>await this.usersRepository.findOne(id);

      if (data.password) data.password = await hash(data.password, 10);
      user = { ...user, ...data };
      await this.usersRepository.save(user);
    }
    return await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: ['userPhotos', 'socialMediaLinks'],
    });
  }

  deleteById(id: number): Observable<any> {
    return of(this.usersRepository.delete({ id }));
  }

  async deleteUserPhotoById(id: number): Promise<any> {
    const photoEntry = await this.userPhotosRepository.findOne(id);
    return await this.userPhotosRepository.remove(photoEntry);
  }

  getUserUsingLatLong(request: LookupRequestUserDto): Promise<any> {
    const {
      lat = 0,
      long = 0,
      range = 0,
      phone,

      size,
      skip,
    } = request;
    let orFilters =
      'locationLatitude IS NOT NULL AND locationLongitude IS NOT NULL ';
    if (phone) {
      orFilters = ` AND phone = "${phone}" `;
    }
    // else if (username) {
    //   orFilters = ` AND username = "${username}" `;
    // }
    const userRep = this.usersRepository
      .createQueryBuilder('user')
      .select([
        '*',
        '(6371 * acos( cos( radians(:lat) ) * cos( radians( locationLatitude ) ) * cos( radians( locationLongitude ) - radians(:long) ) + sin( radians(:lat) ) * sin( radians( locationLatitude ) ) ) ) AS geo',
      ]);
    if (phone) {
      userRep.where(orFilters);
    }
    userRep
      .having('geo < :range')
      .orderBy('geo', 'ASC')
      .setParameters({
        long,
        lat,
        range: range * 1000, //KM conversion
      });
    if (size && skip) {
      userRep.limit(size).offset(skip);
    }
    return userRep.getRawMany();
    // return this.usersRepository
    //   .createQueryBuilder('user')
    //   .select([
    //     '*',
    //     '(6371 * acos( cos( radians(:lat) ) * cos( radians( locationLatitude ) ) * cos( radians( locationLongitude ) - radians(:long) ) + sin( radians(:lat) ) * sin( radians( locationLatitude ) ) ) ) AS geo',
    //   ])
    //   .having('geo < :range')
    //   .orderBy('geo', 'ASC')
    //   .setParameters({
    //     long,
    //     lat,
    //     range: range * 1000, //KM conversion
    //   })
    //   .getRawMany();
  }

  getUserInterest(id: number): Promise<UserInterestdto[]> {
    return this.userInterestRepository.query(
      `SELECT user_interest.id, 
        (CASE user_interest.category
            WHEN 'career' THEN careerInterests.title
            WHEN 'common' THEN commonInterests.title
            WHEN 'family' THEN familyInterests.title
            WHEN 'sport' THEN sportInterests.title
            WHEN 'travel' THEN travelInterests.title
          END) as title, 
          user_interest.description, 
          user_interest.category, 
          user_interest.userId, 
          user_interest.interestId FROM user_interest 
      LEFT JOIN careerInterests ON 
          (user_interest.interestId = careerInterests.id AND user_interest.category = 'career') 
      LEFT JOIN commonInterests ON 
          (user_interest.interestId = commonInterests.id AND user_interest.category = 'common') 
      LEFT JOIN familyInterests ON 
          (user_interest.interestId = familyInterests.id AND user_interest.category = 'family') 
      LEFT JOIN sportInterests ON 
          (user_interest.interestId = sportInterests.id AND user_interest.category = 'sport') 
      LEFT JOIN travelInterests ON 
          (user_interest.interestId = travelInterests.id AND user_interest.category = 'travel') 
      WHERE userId = ${id};`,
    );
  }
}
