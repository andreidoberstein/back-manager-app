import { Test, TestingModule } from '@nestjs/testing';
import { CrmController } from '../../src/crm/crm.controller';
import { CrmService } from '../../src/crm/crm.service';

describe('CrmController', () => {
  let controller: CrmController;
  let service: CrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrmController],
      providers: [
        {
          provide: CrmService,
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

    controller = module.get<CrmController>(CrmController);
    service = module.get<CrmService>(CrmService);
  });

  it('should create a customer', async () => {
    const dto = { name: 'Test', email: 'test@example.com' };
    const user = { id: 1 };
    jest.spyOn(service, 'create').mockResolvedValue({ 
      id: 1, 
      ...dto, 
      userId: 1, 
      phone: '79879', 
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-01T10:00:00Z') 
    });

    const result = await controller.create(dto, user);
    expect(result).toEqual({ id: 1, ...dto, userId: 1 });
    expect(service.create).toHaveBeenCalledWith(dto, user.id);
  });
});