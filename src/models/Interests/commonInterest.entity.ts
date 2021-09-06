import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'commonInterests' })
export default class CommonInterestsEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title: string;

  //   @Column()
  //   parent_id: string;

  @ManyToOne(() => CommonInterestsEntity, (interest) => interest.children)
  parent?: CommonInterestsEntity;

  @OneToMany(() => CommonInterestsEntity, (interest) => interest.parent)
  children?: CommonInterestsEntity[];

  //todo add to user interests
  // @Column()
  // description: string;
}
