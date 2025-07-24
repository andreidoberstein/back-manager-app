import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const dto = { email: 'test@example.com', password: 'password' };
    jest.spyOn(service, 'register').mockResolvedValue({ access_token: 'token' });

    const result = await controller.register(dto);
    expect(result).toEqual({ access_token: 'token' });
    expect(service.register).toHaveBeenCalledWith(dto);
  });

  it('should login a user', async () => {
    const dto = { email: 'test@example.com', password: 'password' };
    jest.spyOn(service, 'login').mockResolvedValue({ access_token: 'token' });

    const result = await controller.login(dto);
    expect(result).toEqual({ access_token: 'token' });
    expect(service.login).toHaveBeenCalledWith(dto);
  });
});