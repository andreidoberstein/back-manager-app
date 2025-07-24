import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from '../../src/reports/reports.service';
import { ReportsRepository } from '../../src/reports/reports.repository';
import { RedisService } from '../../src/config/redis.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let repository: ReportsRepository;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: ReportsRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    repository = module.get<ReportsRepository>(ReportsRepository);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should generate a report', async () => {
    const dto = { title: 'Test Report', data: {} };
    const userId = 1;
    jest.spyOn(redisService, 'get').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockResolvedValue({ id: 1, ...dto, userId,  createdAt: new Date('2024-01-01T10:00:00Z'), });
    jest.spyOn(redisService, 'set').mockResolvedValue();

    const result = await service.generate(dto, userId);
    expect(result).toEqual({ id: 1, ...dto, userId });
    expect(repository.create).toHaveBeenCalledWith({ ...dto, userId });
    expect(redisService.set).toHaveBeenCalled();
  });
});