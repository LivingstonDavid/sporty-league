import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-league-header',
  standalone: true,
  template: `
    <header class="sporty-header">
      <div class="logo-area">
        <div class="logo-icon">⚽</div>
        <h1 class="brand-name">Sporty<span class="highlight">League</span></h1>
      </div>
      <nav class="nav-links">
        <a href="#">Leagues</a>
      </nav>
    </header>
  `,
  styles: [`
    .sporty-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: var(--primary-dark, #051d3cff);
      padding: 0 40px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo-area { display: flex; align-items: center;}
    .logo-icon { font-size: 2rem; }
    .brand-name { font-size: 1.8rem; margin: 0; font-weight: 700; color: white;}
    .highlight { color: var(--accent-color, #00d4ff); }
    .nav-links a { color: #ccc; text-decoration: none; font-weight: 500; font-size: 1.1rem; transition: color 0.3s; }
    .nav-links a:hover { color: var(--accent-color, #00d4ff); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueHeaderComponent { }
