'use client';
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { TLeagueMatch, TleagueMatchList } from "@/types";
import { get7DayRange } from "@/utils/date";
import { useEffect, useMemo, useState } from "react";
import DayItem from "./day";
import LeagueItem from "./league";
import useWebSocketConnectionHook from "@/hook/useSocket";

export default function SocketClient({ initialData }: { initialData: TleagueMatchList | null }) {

    const [matches, setMatches] = useState<TLeagueMatch[]>(initialData?.leagueMatchList || []);
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const [matchDate, setMatchDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [liveOnly, setLiveOnly] = useState<boolean>(false);

    const dates = useMemo(get7DayRange, []); 

    const { emitMessage } = useWebSocketConnectionHook('sendData', (data: any) => {
        setMatches(data?.data?.leagueMatchList);
    });

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false);
            return;
        }

        emitMessage('requestData', { liveOnly, matchDate });

    }, [matchDate, liveOnly]);


    return (
        <main className="h-full min-h-screen w-full flex justify-center bg-black">
            <div className="container max-w-[1200px] p-6">
                <div className="w-full flex gap-4 items-center">
                    <div className={`py-1 px-2 rounded-md cursor-pointer ${liveOnly ? 'bg-red-500' : 'bg-white' }`}
                        onClick={() => setLiveOnly(!liveOnly)}
                    >
                        <p className={`${liveOnly ? 'text-white' : 'text-black'} font-bold text-lg`}>LIVE</p>
                    </div>
                    <div className="flex-1 grid grid-cols-7 gap-3 pb-2 border-b border-gray-400">
                        {dates?.map((date, index) => (
                            <DayItem 
                                key={index}
                                date={date} 
                                activeDay={matchDate} 
                                setActiveDay={setMatchDate}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full mt-2 py-4 flex flex-col gap-2 text-white text-lg">
                    {
                        matches?.length > 0 ? (
                            matches?.map((match, index) => (
                                <LeagueItem league={match} key={index}/>
                            ))
                        ) : (<h1>No match found!</h1>)
                    }
                </div>
            </div>
        </main>
    );
}