import React from "react";
import { TDayInfo } from "@/types";

interface Props {
    activeDay: string;
    setActiveDay: React.Dispatch<React.SetStateAction<string>>
    date: TDayInfo
}

const DayItem = ({ activeDay, setActiveDay, date }: Props) => {
    
    return (
        <div
            className={`p-3 rounded-tl-2xl rounded-tr-2xl text-white cursor-pointer ${
                date.fullDate === activeDay ? "active-day" : ""
            }`}
            onClick={() => setActiveDay(date.fullDate)}
        >
            <div className="flex flex-col items-center justify-center">
                <h3 className="font-bold text-sm">{date.dayName}</h3>
                <p className="text-sm">{date.day} {date.monthName}</p>
            </div>
        </div>
    );
}

export default React.memo(DayItem);