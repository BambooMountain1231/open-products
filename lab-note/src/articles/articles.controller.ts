import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Render,
  Redirect,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Redirect('/articles')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @Render('article/articles')
  async findAll(@Req() req: Request) {
    const user = req.user;
    const articles = await this.articlesService.findAll();
    return { articles, user };
  }

  @Get(':id')
  @Render('article/update')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const user = req.user;
    const article = await this.articlesService.findOne(+id);
    return { user, article };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
