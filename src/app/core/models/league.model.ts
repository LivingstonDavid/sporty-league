import { Observable } from 'rxjs';

export interface League {
    idLeague: string;
    strLeague: string;
    strSport: string;
    strLeagueAlternate: string | null;
}

export interface LeagueBadgeData {
    strBadge: string;
    strSeason: string;
}

export interface LeagueResponse {
    leagues: League[];
}

export interface BadgeResponse {
    seasons: {
        strBadge: string;
        strSeason: string;
    }[] | null;
}

export type BadgeState =
    | { status: 'LOADING' }
    | { status: 'ERROR' }
    | { status: 'SUCCESS'; data: LeagueBadgeData };