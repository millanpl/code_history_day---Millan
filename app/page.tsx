import { Terminal } from "@/components/terminal";
import { getTodayEphemeris, getRandomEphemeris } from "@/lib/ephemerides";

export default async function HomePage() {
  const todayEphemeris = await getTodayEphemeris();
  const fallbackEphemeris = await getRandomEphemeris();

  return (
    <Terminal 
      ephemeris={todayEphemeris} 
      fallbackEphemeris={fallbackEphemeris} 
    />
  );
}
