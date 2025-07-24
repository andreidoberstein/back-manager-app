import { Test, TestingModule } from '@nestjs/testing';
import { FinancialService } from '../../src/financial/financial.service';
import { FinancialRepository } from '../../src/financial/financial.repository';

describe('FinancialService', () => {
  let service: FinancialService;
  let repository: FinancialRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinancialService,
        {
          provide: FinancialRepository,
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

    service = module.get<FinancialService>(FinancialService);
    repository = module.get<FinancialRepository>(FinancialRepository);
  });

  it('should create a transaction', async () => {
    const dto = { amount: 100, description: 'Test' };
    const userId = 1;
    jest.spyOn(service, 'create').mockResolvedValue({ 
      id: 1, 
      ...dto, 
      userId: 1, 
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-01T10:00:00Z') 
    });
    
    const result = await service.create(dto, userId);
    expect(result).toEqual({ id: 1, ...dto, userId });
    expect(repository.create).toHaveBeenCalledWith({ ...dto, userId });
  });
});