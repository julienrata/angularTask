import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, HttpResponse<any>>();

  constructor() {}

  get(key: string): HttpResponse<any> | undefined {
    return this.cache.get(key);
  }

  set(key: string, response: HttpResponse<any>): void {
    this.cache.set(key, response);
    console.log(`📥 [CACHE STORE] ${key}`);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clearCache(): void {
    this.cache.clear();
    console.log('🧹 Cache cleared');
  }

  clearEntry(url: string): void {
    this.cache.delete(url);
    console.log(`🗑️ Cache entry cleared: ${url}`);
  }
}