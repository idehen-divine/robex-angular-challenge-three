import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShortenerService } from '../../service/shortner/shortener.service';
import { UrlInput } from '../../types/short/url-input';
import { Network } from '@capacitor/network'; 
import { Share } from '@capacitor/share';


@Component({
	selector: 'app-shorten',
	templateUrl: './shorten.component.html',
	styleUrls: ['./shorten.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule],
})
export class ShortenComponent implements OnInit {
	@ViewChild('urlInput') urlInput!: NgModel;

	longUrl = '';
	error: string | null = null;
	loading = false;

	shortenedLinks: UrlInput[] = [];
	copiedUrl: string | null = null;
	offline: boolean = false;

	constructor(
		private shortenerService: ShortenerService
	) {
		this.shortenedLinks = this.shortenerService.getTopShortenedUrls();
	}

	ngOnInit(): void {
		Network.addListener('networkStatusChange', (status) => {
			console.log('Network status changed:', status);
			this.offline = !status.connected;
		});
	}

	shortenUrl() {
		if(this.offline)
		{
			this.error = 'You are offline. Please check your internet connection.';
			this.loading = false;
			return;
		}
		
		this.error = null;
		this.loading = true;

		const trimmed = this.longUrl.trim();
		if (!trimmed) {
			this.error = 'Please add a link';
			this.loading = false;
			return;
		}
		if (!/^https?:\/\//.test(trimmed)) {
			this.error = 'Please enter a valid URL (http:// or https://)';
			this.loading = false;
			return;
		}

		this.shortenerService.shortenUrl(trimmed).subscribe({
			next: (shortUrl) => {
				this.shortenedLinks = this.shortenerService.getTopShortenedUrls();
				this.longUrl = '';
				this.urlInput.control.markAsPristine();
				this.urlInput.control.markAsUntouched();
				this.loading = false;
			},
			error: (err) => {
				this.error = err.message || 'Failed to shorten the URL';
				this.loading = false;
			},
		});
	}

	async copyToClipboard(url: string) {
		await Share.share({
			url: url,
		  });
		navigator.clipboard.writeText(url).then(() => {
			this.copiedUrl = url;
			setTimeout(() => (this.copiedUrl = null), 2000);
		});
	}
}
