import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(@Body('name') name: string, @Body('subdomain') subdomain: string): Promise<Tenant> {
    return this.tenantService.createTenant(name, subdomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tenant | null> {
    return this.tenantService.findTenantById(id);
  }

  @Get()
  async findAll(): Promise<Tenant[]> {
    return this.tenantService.findAllTenants();
  }
}
