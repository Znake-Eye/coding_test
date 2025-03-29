import { TleagueMatchList } from "@/types";
import SocketClient from "@/components/socketClient";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE

async function fetchMatch(): Promise<TleagueMatchList | null> {
    const date = new Date();
    const formatDate = date.toISOString().split("T")[0];
    try {
        const res = await fetch(`${baseUrl}?matchDate=${formatDate}&liveOnly=false&lang=en_KH&timeZone=Asia%2FBangkok`);
        const data = await res.json();
        return data?.result || {};
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default async function Home() {

    const defaultMatches = await fetchMatch();

    return (
        <SocketClient initialData={defaultMatches || null} />
    )

}