import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { League, LeagueResponse, BadgeResponse, LeagueBadgeData } from '../models/league.model';
import { API_CONFIG } from '../constants/api.config';

@Injectable({ providedIn: 'root' })
export class LeagueService {
    private http = inject(HttpClient);
    private readonly BASE_URL = API_CONFIG.BASE_URL;
    private badgeCache = new Map<string, Observable<LeagueBadgeData | null>>();

    getAllLeagues(): Observable<League[]> {
        return this.http
            .get<LeagueResponse>(`${this.BASE_URL}${API_CONFIG.ENDPOINTS.ALL_LEAGUES}`)
            .pipe(
                map((res) => res?.leagues ?? []),
                catchError(() => of([]))
            );
    }

    getLeagueBadge(id: string): Observable<LeagueBadgeData | null> {
        const cached = this.badgeCache.get(id);
        if (cached) return cached;

        const params = new HttpParams()
            .set('badge', '1')
            .set('id', id);

        const request$ = this.http
            .get<BadgeResponse>(`${this.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH_SEASONS}`, { params })
            .pipe(
                map((res) => this.mapBadgeResponse(res)),
                catchError(() => of(null)),
                shareReplay(1)
            );


        this.badgeCache.set(id, request$);
        return request$;
    }

    private mapBadgeResponse(res: BadgeResponse): LeagueBadgeData | null {
        const first = res?.seasons?.[0];
        if (!first?.strBadge) return null;

        return {
            strBadge: first.strBadge,
            strSeason: first.strSeason ?? ''
        };
    }
}
