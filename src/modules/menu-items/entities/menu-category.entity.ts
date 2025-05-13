import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { MenuItem } from './menu-item.entity';

@Entity()
export class MenuCategory extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  displayOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => MenuItem, (item) => item.category)
  items: MenuItem[];
}
