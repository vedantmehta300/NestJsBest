import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'familyInterests' })
export default class FamilyInterestEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title: string;

  //   @Column()
  //   parent_id: string;

  @ManyToOne(() => FamilyInterestEntity, (interest) => interest.children)
  parent?: FamilyInterestEntity;

  @OneToMany(() => FamilyInterestEntity, (interest) => interest.parent)
  children?: FamilyInterestEntity[];

  //todo add to user interests
  // @Column()
  // description: string;
}
