interface TDayInfo {
    day: number;
    fullDate: string;
    dayName: string;
    monthName: string;
}

interface TOpponent {
    teamId: number;
    name: string;
    isFavTeam: boolean;
    logo: string;
    penaltyScore: string | number;
    penaltyWin: string | number;
    redCard: number;
    score: string;
    yellowCard: number;
}

interface TMatch {
    matchId: number;
    containHighlight: string;
    containLiveStream: boolean;
    isFavMatch: boolean;
    isLive: boolean;
    liveStreamList: boolean;
    matchDate: string;
    matchIsActiveProviderStream: boolean;
    matchName: string;
    matchState: number;
    matchStatus: string;
    matchTime: string;
    matchTimestamp: string;
    roundEn: string;
    opponents: TOpponent[];
}

interface TLeagueMatch {
    leagueId: number;
    country: string;
    countryKey: string;
    isFavLeague: boolean;
    leagueName: string;
    logo: string;
    roundEn: string | number;
    subLeagueId: string;
    subLeagueName: string;
    matchList: TMatch[];
}

interface TleagueMatchList {
    leagueMatchList: TLeagueMatch[],
    oddsListMatchMap: unknown
};

export {
    TDayInfo,
    TOpponent,
    TMatch,
    TLeagueMatch,
    TleagueMatchList,
}