import { HeroComponent } from './components/hero/hero.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { Component } from '@angular/core';
import { ShortenComponent } from './components/shorten/shorten.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CtaComponent } from './components/cta/cta.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, HeroComponent, ShortenComponent, StatisticsComponent, CtaComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Shortly - Home Page';
}
