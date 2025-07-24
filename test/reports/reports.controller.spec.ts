import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from '../../src/reports/reports.controller';
import { ReportsService } from '../../src/reports/reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: {
            generate: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
    service = module.get<ReportsService>(ReportsService);
  });

  it('should generate a report', async () => {
    const dto = { title: 'Test Report', data: {} };
    const user = { id: 1 };
    jest.spyOn(service, 'generate').mockResolvedValue({ id: 1, ...dto, userId: 1 });

    const result = await controller.generate(dto, user);
    expect(result).toEqual({ id: 1, ...dto, userId: 1 });
    expect(service.generate).toHaveBeenCalledWith(dto, user.id);
  });
});