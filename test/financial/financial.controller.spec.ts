import { Test, TestingModule } from '@nestjs/testing';
import { FinancialController } from '../../src/financial/financial.controller';
import { FinancialService } from '../../src/financial/financial.service';

describe('FinancialController', () => {
  let controller: FinancialController;
  let service: FinancialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialController],
      providers: [
        {
          provide: FinancialService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FinancialController>(FinancialController);
    service = module.get<FinancialService>(FinancialService);
  });

  it('should create a transaction', async () => {
    const dto = { amount: 100, description: 'Test' };
    const user = { id: 1 };
    jest.spyOn(service, 'create').mockResolvedValue({ 
      id: 1, 
      ...dto, 
      userId: 1, 
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-01T10:00:00Z') 
    });

    const result = await controller.create(dto, user);
    expect(result).toEqual({ id: 1, ...dto, userId: 1 });
    expect(service.create).toHaveBeenCalledWith(dto, user.id);
  });
});