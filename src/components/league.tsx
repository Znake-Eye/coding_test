import React from "react";
import MatchItem from "./matchItem";
import { TLeagueMatch } from "@/types";
import { IoIosArrowForward } from "react-icons/io";
interface Props {
    league: TLeagueMatch
}

const LeagueItem = ({ league }: Props) => {

    return (
        <section>
            <h1 className="text-xl mb-2">
                {league?.country} | {league?.leagueName} 
                <span className="inline-block align-middle"><IoIosArrowForward /></span>
            </h1>
            <div className="flex gap-2 flex-col">
                {
                    league?.matchList?.length > 0 ? (
                        league.matchList.map((match, index) => (
                            <MatchItem match={match} key={index}/>
                        ))
                    ) : null
                }
            </div>
        </section>
    );
}

export default React.memo(LeagueItem);