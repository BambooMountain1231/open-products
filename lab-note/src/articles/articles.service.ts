import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.articlesRepository.save(createArticleDto);
  }

  async findAll() {
    return { articles: await this.articlesRepository.find() };
  }

  async findOne(id: number) {
    return {
      article: await this.articlesRepository.findOneBy({
        id: id,
      }),
    };
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.articlesRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    return await this.articlesRepository.delete(id);
  }
}
