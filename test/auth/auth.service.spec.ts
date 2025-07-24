import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should register a user', async () => {
    const registerDto = { email: 'test@example.com', password: 'password' };
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = {
      id: 1,
      email: registerDto.email,
      password: hashedPassword,
      role: 'USER',
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-01T10:00:00Z')
    };

    jest.spyOn(prisma.user, 'create').mockResolvedValue(user);
    jest.spyOn(jwtService, 'sign').mockReturnValue('token');

    const result = await service.register(registerDto);
    expect(result).toEqual({ access_token: 'token' });
    expect(prisma.user.create).toHaveBeenCalled();
  });
});
