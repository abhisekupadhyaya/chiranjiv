import { MissionCTA } from "@/components/mission/MissionCTA";
import { MissionFuture } from "@/components/mission/MissionFuture";
import { MissionHero } from "@/components/mission/MissionHero";
import { MissionPlan } from "@/components/mission/MissionPlan";
import { MissionPrinciples } from "@/components/mission/MissionPrinciples";
import { MissionProblem } from "@/components/mission/MissionProblem";
import { MissionWhyWeExist } from "@/components/mission/MissionWhyWeExist";

export default function Mission() {
  return (
    <main className="min-h-screen bg-white pb-16 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MissionHero />
        <MissionWhyWeExist />
        <MissionProblem />
        <MissionPlan />
        <MissionPrinciples />
        <MissionFuture />
        <MissionCTA />
      </div>
    </main>
  );
}
