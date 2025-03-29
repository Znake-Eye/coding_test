import { TMatch } from "@/types"
import { getFullImageUrl } from "@/utils"
import Image from "next/image"
import React from "react"
import { IoStarOutline } from "react-icons/io5"
import { MdOndemandVideo } from "react-icons/md"

interface Props {
    match: TMatch
}

const NormalMatch = ({ match }: Props) => {

    const imageUrl = (path: string) => {
        return path ? getFullImageUrl(path) : '';
    }

    return (
        <div className="flex gap-4 w-full bg-gray-700 rounded-md py-1 px-4">
            <div className="flex gap-4 justify-between items-center w-1/6 max-w-32">
                <IoStarOutline className="text-2xl"/>
                <p className="text-sm">{match?.matchStatus || ''}</p>
            </div>
            <div className="flex-1">
                <table className="w-full text-sm">
                    <tbody>
                        {
                            match?.opponents?.map((opponent, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex py-1 items-center gap-2">
                                            <Image 
                                                alt="flag"
                                                width={25}
                                                height={25}
                                                className="object-contain"
                                                src={imageUrl(opponent?.logo)}
                                            />
                                            <span>{opponent.name}</span>
                                        </div>
                                    </td>
                                    <td  className="text-end px-2">{opponent?.score || ''}</td>
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
    );
}

export default React.memo(NormalMatch);