import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'sportInterests' })
export default class SportInterestEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title: string;

  //   @Column()
  //   parent_id: string;

  @ManyToOne(() => SportInterestEntity, (interest) => interest.children)
  parent?: SportInterestEntity;

  @OneToMany(() => SportInterestEntity, (interest) => interest.parent)
  children?: SportInterestEntity[];

  //todo add to user interests
  // @Column()
  // description: string;
}
