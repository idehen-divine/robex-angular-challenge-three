import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UrlInput } from '../../types/short/url-input';
import { UrlResponse } from '../../types/short/url-response';

@Injectable({
	providedIn: 'root',
})
export class ShortenerService {
	private apiToken = environment.tinyUrlApiKey;
	private apiUrl = environment.tinyUrlApiUrl;
	private localStorageKey = environment.localStorageKey;

	constructor(private http: HttpClient) { }

	shortenUrl(longUrl: string): Observable<string> {
		const trimmed = longUrl.trim();

		if (!/^https?:\/\//.test(trimmed)) {
			return throwError(() => new Error('URL must start with http:// or https://'));
		}

		const body = {
			url: trimmed,
			domain: 'tinyurl.com',
		};

		return this.http.post<UrlResponse>(this.apiUrl, body, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.apiToken}`,
			},
		}).pipe(
			map(res => res.data.tiny_url),
			tap(shortUrl => this.saveToLocalStorage({ longUrl: trimmed, shortUrl })),
			catchError(() => throwError(() => new Error('Failed to shorten the URL')))
		);
	}

	getTopShortenedUrls(): UrlInput[] {
		return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
	}

	private saveToLocalStorage(item: UrlInput): void {
		const existing: UrlInput[] = JSON.parse(
			localStorage.getItem(this.localStorageKey) || '[]'
		);

		const updated = [item, ...existing.filter(i => i.longUrl !== item.longUrl)];

		if (updated.length > 3) {
			updated.length = 3;
		}

		localStorage.setItem(this.localStorageKey, JSON.stringify(updated));
	}
}
