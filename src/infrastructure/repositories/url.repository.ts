import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlRepository } from 'src/core/ports/url-repository';
import { Url } from 'src/core/domain/url';
import { UrlDocument } from '../schemas/url.schema';

@Injectable()
export class UrlRepositoryImpl implements UrlRepository {
  constructor(
    @InjectModel('Url') private readonly urlModel: Model<UrlDocument>,
  ) {}

  async save(url: Url): Promise<Url> {
    const createdUrl = new this.urlModel(url);
    const result = await createdUrl.save();
    return new Url(
      result.id,
      result.shortUrl,
      result.originalUrl,
      result.action,
    );
  }

  async findAll(): Promise<Url[]> {
    const urls = await this.urlModel.find().exec();
    return urls.map(
      (url) => new Url(url.id, url.shortUrl, url.originalUrl, url.action),
    );
  }

  async findById(id: string): Promise<Url | null> {
    const url = await this.urlModel.findById(id).exec();
    if (!url) return null;
    return new Url(url.id, url.shortUrl, url.originalUrl, url.action);
  }

  async update(id: string, url: Url): Promise<Url> {
    const updatedUrl = await this.urlModel
      .findByIdAndUpdate(id, url, { new: true })
      .exec();
    return new Url(
      updatedUrl.id,
      updatedUrl.shortUrl,
      updatedUrl.originalUrl,
      updatedUrl.action,
    );
  }

  async delete(id: string): Promise<void> {
    await this.urlModel.findByIdAndDelete(id).exec();
  }
}
