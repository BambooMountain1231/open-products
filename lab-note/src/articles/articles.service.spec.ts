import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

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

const updateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};

const deleteResult = {
  raw: [],
  affected: 1,
};

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: {
            save: jest.fn().mockResolvedValue(articleArray[0]),
            find: jest.fn().mockResolvedValue(articleArray),
            findOneBy: jest.fn().mockResolvedValue(articleArray[0]),
            update: jest.fn().mockResolvedValue(updateResult),
            delete: jest.fn().mockResolvedValue(deleteResult),
          },
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an article', async () => {
      expect(
        await service.create({
          title: '副ゼミ長タスク',
          content: '月一回、夜間申請をします',
        }),
      ).toEqual(articleArray[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      expect(await service.findAll()).toEqual({ articles: articleArray });
    });
  });

  describe('findOne', () => {
    it('should return an article', async () => {
      expect(await service.findOne(1)).toEqual({ article: articleArray[0] });
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      expect(
        await service.update(1, {
          content: 'その他、欠席時にゼミ長の代打も引き受けま',
        }),
      ).toEqual(updateResult);
    });
  });

  describe('delete', () => {
    it('should delete an article', async () => {
      expect(await service.remove(1)).toEqual(deleteResult);
    });
  });
});
