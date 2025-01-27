import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async createTenant(name: string, subdomain: string): Promise<Tenant> {
    const tenant = new Tenant();
    tenant.name = name;
    tenant.subdomain = subdomain;
    return await this.tenantRepository.save(tenant);
  }

  async findTenantById(id: string): Promise<Tenant | null> {
    return await this.tenantRepository.findOne({ where: { id } });
  }

  async findAllTenants(): Promise<Tenant[]> {
    return await this.tenantRepository.find();
  }
}
