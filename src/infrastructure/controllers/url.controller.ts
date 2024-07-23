import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUrlDto, UpdateUrlDto } from 'src/application/dtos/url.dto';
import { Url } from 'src/core/domain/Url';
import { UrlService } from 'src/core/services/url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUserDto: CreateUrlDto): Promise<Url> {
    const user = new Url(
      null,
      createUserDto.shortUrl,
      createUserDto.originalUrl,
      createUserDto.action,
    );
    return this.urlService.create(user);
  }

  @Get()
  findAll(): Promise<Url[]> {
    return this.urlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Url | null> {
    return this.urlService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUrlDto,
  ): Promise<Url> {
    const user = new Url(
      id,
      updateUserDto.originalUrl,
      updateUserDto.shortUrl,
      updateUserDto.action,
    );
    return this.urlService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.urlService.delete(id);
  }
}
