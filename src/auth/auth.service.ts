import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) return null;
      
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (!isPasswordValid) return null;
      
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserById(userId: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOne({ where: { id: userId } });
    } catch (error) {
      throw new Error(`User validation failed: ${error.message}`);
    }
  }
}
