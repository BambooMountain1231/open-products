import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

const articleArray = [
  {
    title: '副ゼミ長タスク',
    content: '月一回、夜間申請をします',
  },
  {
    title: 'ラボ管理タスク',
    content: 'ゼミ室の清掃などの責任者です',
  },
];

const createArticleDto: CreateArticleDto = {
  title: '副ゼミ長タスク',
  content: '月一回、夜間申請をします',
};

const updateArticleDto: UpdateArticleDto = {
  content: 'その他、欠席時にゼミ長の代打も引き受けます',
};

const updateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};

const deleteResult = {
  raw: [],
  affected: 1,
};

describe('ArticlesController', () => {
  let controller: ArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        ArticlesService,
        {
          provide: ArticlesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createArticleDto: CreateArticleDto) =>
                Promise.resolve({
                  id: 1,
                  ...createArticleDto,
                }),
              ),
            findAll: jest.fn().mockResolvedValue(articleArray),
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve(articleArray[id - 1]),
              ),
            update: jest.fn().mockResolvedValue(updateResult),
            remove: jest.fn().mockResolvedValue(deleteResult),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an article', async () => {
      expect(await controller.create(createArticleDto)).toEqual({
        id: 1,
        ...createArticleDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      expect(await controller.findAll()).toEqual(articleArray);
    });
  });

  describe('findOne', () => {
    it('should return an article', async () => {
      expect(await controller.findOne('1')).toEqual(articleArray[0]);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      expect(await controller.update('1', updateArticleDto)).toBe(updateResult);
    });
  });

  describe('delete', () => {
    it('should delete an article', async () => {
      expect(await controller.remove('1')).toBe(deleteResult);
    });
  });
});
