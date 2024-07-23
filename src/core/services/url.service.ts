import { Inject, Injectable } from '@nestjs/common';
import { URL_REPOSITORY_TOKEN, UrlRepository } from '../ports/url-repository';
import { Url } from '../domain/url';

@Injectable()
export class UrlService {
  constructor(
    @Inject(URL_REPOSITORY_TOKEN)
    private readonly urlRepository: UrlRepository,
  ) {}

  create(url: Url): Promise<Url> {
    return this.urlRepository.save(url);
  }

  findAll(): Promise<Url[]> {
    return this.urlRepository.findAll();
  }

  findById(id: string): Promise<Url | null> {
    return this.urlRepository.findById(id);
  }

  update(id: string, url: Url): Promise<Url> {
    return this.urlRepository.update(id, url);
  }

  delete(id: string): Promise<void> {
    return this.urlRepository.delete(id);
  }
}
