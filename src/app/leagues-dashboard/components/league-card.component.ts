import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { League } from '../../core/models/league.model';

@Component({
  selector: 'app-league-card',
  standalone: true,
  template: `
    <div
      class="card"
      role="button"
      tabindex="0"
      (click)="cardClick.emit()"
    >
      <div class="card-border"></div>
      <div class="card-content">
        <span class="sport-badge">{{ league().strSport }}</span>
        <h3 class="league-title">{{ league().strLeague }}</h3>

        @if (league().strLeagueAlternate; as alt) {
          <p class="league-alt">{{ alt }}</p>
        }
      </div>

      <div class="click-hint">Click for details →</div>
    </div>
  `,
  styles: [`
    .card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s ease; position: relative; height: 100%; display: flex; flex-direction: column; justify-content: space-between; outline: none; }
    .card:focus-visible { box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.35), 0 10px 20px rgba(0,0,0,0.1); }
    .card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
    .card-border { height: 4px; background: var(--accent-color, #00d4ff); width: 0; transition: width 0.3s; }
    .card:hover .card-border { width: 100%; }
    .card-content { padding: 20px; }
    .sport-badge { background: #eef2f5; color: #555; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; }
    .league-title { margin: 15px 0 5px; font-size: 1.2rem; color: #2c3e50; }
    .league-alt { font-size: 0.9rem; color: #999; margin: 0; font-style: italic; }
    .click-hint { padding: 10px 20px; font-size: 0.85rem; color: var(--accent-color); font-weight: 600; text-align: right; opacity: 0; transition: opacity 0.3s; }
    .card:hover .click-hint { opacity: 1; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueCardComponent {
  league = input.required<League>();
  cardClick = output<void>();
}
