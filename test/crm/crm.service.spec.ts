import { Test, TestingModule } from '@nestjs/testing';
import { CrmService } from '../../src/crm/crm.service';
import { CrmRepository } from '../../src/crm/crm.repository';

describe('CrmService', () => {
  let service: CrmService;
  let repository: CrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrmService,
        {
          provide: CrmRepository,
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

    service = module.get<CrmService>(CrmService);
    repository = module.get<CrmRepository>(CrmRepository);
  });

  it('should create a customer', async () => {
    const dto = { name: 'Test', email: 'test@example.com' };
    const userId = 1;
    jest.spyOn(service, 'create').mockResolvedValue({ 
      id: 1, ...dto, 
      userId: 1, 
      phone: '79879', 
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-01T10:00:00Z') 
    });

    const result = await service.create(dto, userId);
    expect(result).toEqual({ id: 1, ...dto, userId });
    expect(repository.create).toHaveBeenCalledWith({ ...dto, userId });
  });
});