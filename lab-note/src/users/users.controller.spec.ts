import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { describe } from 'node:test';

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

const createUserDto: CreateUserDto = {
  username: 'guest1',
  stNumber: 'hogehoge',
  password: 'aiueo',
};

const updateUserDto: UpdateUserDto = {
  password: 'aiueokakiku',
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

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createUserDto: CreateUserDto) =>
                Promise.resolve({
                  id: 1,
                  ...createUserDto,
                }),
              ),
            findAll: jest.fn().mockResolvedValue(userArray),
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve(userArray[id - 1]),
              ),
            update: jest.fn().mockResolvedValue(updateResult),
            remove: jest.fn().mockResolvedValue(deleteResult),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an user', async () => {
      expect(await controller.create(createUserDto)).toEqual({
        id: 1,
        ...createUserDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await controller.findAll()).toEqual(userArray);
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      expect(await controller.findOne('1')).toEqual(userArray[0]);
    });
  });

  describe('update', () => {
    it('should update an user', async () => {
      expect(await controller.update('1', updateUserDto)).toBe(updateResult);
    });
  });

  describe('delete', () => {
    it('should delete an user', async () => {
      expect(await controller.remove('1')).toBe(deleteResult);
    });
  });
});
