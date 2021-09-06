import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'careerInterests' })
export default class CareerInterestEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title: string;

  //   @Column()
  //   parent_id: string;

  @ManyToOne(() => CareerInterestEntity, (interest) => interest.children)
  parent?: CareerInterestEntity;

  @OneToMany(() => CareerInterestEntity, (interest) => interest.parent)
  children?: CareerInterestEntity[];

  //todo add to user interests
  // @Column()
  // description: string;
}
