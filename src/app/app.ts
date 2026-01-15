import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LeaguesDashboardComponent } from './leagues-dashboard/components/leagues-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [LeaguesDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('sporty-league-list');
}
