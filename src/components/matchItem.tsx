import { TMatch } from "@/types";
import React from "react";
import PenaltyMatch from "./penaltyMatch";
import NormalMatch from "./normalMatch";

interface TProps {
    match: TMatch
}

const MatchItem = ({ match }: TProps) => {
    
    if (match?.matchStatus =='Pen.') {
        return (<PenaltyMatch match={match} />);
    } else {
        return (<NormalMatch match={match} />);
    }
}

export default React.memo(MatchItem);