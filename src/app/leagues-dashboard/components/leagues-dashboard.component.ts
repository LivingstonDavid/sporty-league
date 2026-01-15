import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { LeagueService } from '../../core/services/league.service';
import { League, BadgeState } from '../../core/models/league.model';
import { LeagueCardComponent } from './league-card.component';
import { LeagueDetailsModalComponent } from './league-details-modal.component';
import { LeagueFiltersComponent } from './league-filters.component';
import { LeagueHeaderComponent } from './league-header.component';

@Component({
    selector: 'app-leagues-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        LeagueHeaderComponent,
        LeagueFiltersComponent,
        LeagueCardComponent,
        LeagueDetailsModalComponent,
    ],
    templateUrl: './leagues-dashboard.component.html',
    styles: [`
    .main-container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; }
    .empty-state { grid-column: 1 / -1; text-align: center; padding: 60px; color: #888; font-size: 1.2rem; background: white; border-radius: 8px; }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaguesDashboardComponent {
    private service = inject(LeagueService);

    searchTerm = signal('');
    sportFilter = signal<'All' | string>('All');

    allLeagues = toSignal(this.service.getAllLeagues(), { initialValue: [] });

    sportsOptions = computed(() => {
        const list = this.allLeagues();
        const sportType = list.map(league => league.strSport);
        const customSportTypes = ['Motorsport', 'Basketball', 'Soccer'];
        return Array.from(new Set([...sportType, ...customSportTypes])).sort();
    });

    leaguesList = computed(() => {
        const leagues = this.allLeagues();
        const term = this.searchTerm().trim().toLowerCase();
        const sport = this.sportFilter();

        return leagues.filter(l => {
            const matchesTerm = !term || l.strLeague.toLowerCase().includes(term);
            const matchesSport = sport === 'All' || l.strSport === sport;
            return matchesTerm && matchesSport;
        });
    });

    selectedLeague = signal<League | null>(null);

    badgeState = toSignal(
        toObservable(this.selectedLeague).pipe(
            map(league => league?.idLeague ?? null),
            distinctUntilChanged(),
            switchMap((id) => {
                if (!id) return of<BadgeState | null>(null);

                return this.service.getLeagueBadge(id).pipe(
                    map((result) => {
                        if (result && result.strBadge) {
                            return { status: 'SUCCESS', data: result } as BadgeState;
                        }
                        return { status: 'ERROR' } as BadgeState;
                    }),
                    startWith({ status: 'LOADING' } as BadgeState)
                );
            })
        ),
        { initialValue: null }
    );

    onSearch(term: string) {
        this.searchTerm.set(term);
    }

    onFilter(sport: string) {
        this.sportFilter.set(sport);
    }

    openDetails(league: League) {
        this.selectedLeague.set(league);
    }

    closeDetails() {
        this.selectedLeague.set(null);
    }
}
