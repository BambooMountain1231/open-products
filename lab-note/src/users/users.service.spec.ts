import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const userArray = [
  {
    username: 'guest1',
    stNumber: 'hogehoge',
    password: 'aiueo',
  },
  {
    username: 'guest2',
    stNumber: 'fugafuga',
    password: 'abcde',
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

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(userArray[0]),
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(userArray[0]),
            update: jest.fn().mockResolvedValue(updateResult),
            delete: jest.fn().mockResolvedValue(deleteResult),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an user', async () => {
      expect(
        await service.create({
          username: 'guest1',
          stNumber: 'hogehoge',
          password: 'aiueo',
        }),
      ).toEqual(userArray[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of article', async () => {
      expect(await service.findAll()).toEqual({ users: userArray });
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      expect(await service.findOne(1)).toEqual({ user: userArray[0] });
    });
  });

  describe('update', () => {
    it('should update an user', async () => {
      expect(
        await service.update(1, {
          password: 'aiueokakiku',
        }),
      ).toEqual(updateResult);
    });
  });

  describe('delete', () => {
    it('should delete an user', async () => {
      expect(await service.remove(1)).toEqual(deleteResult);
    });
  });
});
