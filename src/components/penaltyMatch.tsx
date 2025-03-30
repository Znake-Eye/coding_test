import React from "react";
import { TMatch } from "@/types"
import { getFullImageUrl } from "@/utils";
import { IoStarOutline } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import Image from "next/image";

interface TProps {
    match: TMatch
}
const PenaltyMatch = ({ match }: TProps) => {

    const imageUrl = (path: string) => {
        return path ? getFullImageUrl(path) : '';
    }

    return (
        <div className="flex gap-4 w-full bg-gray-700 rounded-md py-1 px-4">
            <div className="flex gap-1 justify-between items-center w-1/6 max-w-32">
                <IoStarOutline className="text-2xl"/>
                <p className="text-sm">{match.matchStatus}</p>
            </div>
            <div className="flex-1">
                <table className="w-full text-sm">
                    <tbody>
                        {
                            match?.opponents?.map((opponent, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Image 
                                                alt="flag"
                                                width={25}
                                                height={20}
                                                className="object-contain"
                                                src={imageUrl(opponent?.logo)}
                                            />
                                            <span>{opponent.name}</span>
                                            <span className="px-1 bg-green-500 rounded-md">P</span>
                                        </div>
                                    </td>
                                    <td>
                                        <table className="ml-auto">
                                            <tbody>
                                                <tr>
                                                    <td className="border-r px-2">{opponent.score}</td>
                                                    <td className="text-left px-2">{opponent.penaltyScore}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="w-1/12 max-w-20 flex items-center justify-center">
                <MdOndemandVideo className="text-2xl text-gray-500"/>
            </div>
        </div>
    )
}

export default React.memo(PenaltyMatch);