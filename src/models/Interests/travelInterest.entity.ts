import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'travelInterests' })
export default class TravelInterestEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title: string;

  //   @Column()
  //   parent_id: string;

  @ManyToOne(() => TravelInterestEntity, (interest) => interest.children)
  parent?: TravelInterestEntity;

  @OneToMany(() => TravelInterestEntity, (interest) => interest.parent)
  children?: TravelInterestEntity[];

  //todo add to user interests
  // @Column()
  // description: string;
}
