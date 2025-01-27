import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Tenant, tenant => tenant.users)
  tenant: Tenant;
}
