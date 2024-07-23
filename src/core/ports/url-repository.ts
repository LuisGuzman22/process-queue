import { Url } from '../domain/url';

export const URL_REPOSITORY_TOKEN = Symbol('URL_REPOSITORY_TOKEN');

export interface UrlRepository {
  save(user: Url): Promise<Url>;
  findAll(): Promise<Url[]>;
  findById(id: string): Promise<Url | null>;
  update(id: string, user: Url): Promise<Url>;
  delete(id: string): Promise<void>;
}
