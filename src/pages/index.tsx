'use Client';
/* eslint-disable  @typescript-eslint/no-explicit-any */
import DayItem from "@/components/day";
import useWebSocketConnectionHook from "@/hook/useSocket";
import { get7DayRange } from "@/utils/date";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { TLeagueMatch, TleagueMatchList } from "@/types";
import LeagueItem from "@/components/league";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

export async function getStaticProps() {
    const date = new Date();
    const dateFormat = date.toISOString().split("T")[0]
    const res = await axios.get(`${baseUrl}?matchDate=${dateFormat}&liveOnly=false&lang=en_KH&timeZone=Asia%2FBangkok`);
    const data = res.data;
  
    return {
        props: {
            initialData: data?.result || [],
        },
        revalidate: 600,
    };
}

export default function Home({ initialData }: { initialData: TleagueMatchList }) {

    const dates = useMemo(get7DayRange, []); 

    const [matchDate, setMatchDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [liveOnly, setLiveOnly] = useState<boolean>(false);
    const [matches, setMatches] = useState<TLeagueMatch[]>(initialData.leagueMatchList);
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

    const { emitMessage } = useWebSocketConnectionHook('sendData', (data: any) => {
        setMatches(data?.data?.leagueMatchList);
    });

    const requestData = (liveOnly: boolean = false, matchDate: string) => {
        emitMessage('requestData', {
            liveOnly, matchDate
        });
    }

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false);
            return;
        }

        requestData(liveOnly, matchDate);
    }, [liveOnly, matchDate]);

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