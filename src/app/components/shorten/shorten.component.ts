import { Component, ViewChild, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShortenComponent implements OnInit {
	@ViewChild('urlInput') urlInput!: NgModel;

	longUrl = '';
	error: string | null = null;
	loading = false;

	shortenedLinks: UrlInput[] = [];
	copiedUrl: string | null = null;
	offline: boolean = false;

	toastMessage: string | null = null;

	constructor(private shortenerService: ShortenerService) {
		this.shortenedLinks = this.shortenerService.getTopShortenedUrls();
	}

	ngOnInit(): void {
		Network.addListener('networkStatusChange', (status) => {
			this.offline = !status.connected;
		});
	}

	shortenUrl() {
		if (this.offline) {
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

	copyToClipboard(url: string) {
		navigator.clipboard.writeText(url).then(() => {
			this.copiedUrl = url;
			this.showToast('Copied to clipboard!');
			this.vibrate(100);
			setTimeout(() => (this.copiedUrl = null), 2000);
		});
	}

	async shareUrl(url: string) {
		try {
			await navigator.share({
				title: 'Check out this shortened URL',
				url,
			});
			this.showToast('Shared successfully!');
			this.vibrate(200);
		} catch (err) {
			this.showToast('Share canceled or failed');
		}
	}

	showToast(message: string) {
		this.toastMessage = message;
		setTimeout(() => (this.toastMessage = null), 3000);
	}

	vibrate(duration: number) {
		if (navigator.vibrate) {
			navigator.vibrate(duration);
		}
	}
}
