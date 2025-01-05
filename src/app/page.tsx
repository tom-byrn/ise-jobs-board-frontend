import AnimatedHeroText from "@/components/animated-hero";
import { PartnerCarousel } from "@/components/partners-carousel";
import { Testimonal } from "@/components/testimonials";
import { NiceLink } from "@/components/ui/nice-link";
import { GraduationCap, Handshake } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-screen flex-col px-4 pt-10 md:pt-12">
      <AnimatedHeroText text="The next generation computer science course." />
      <h2 className="w-3/4 pt-3 font-mono text-gray-800 dark:text-neutral-300 lg:pt-0">
        Immersive Software Engineering is a radical leap forward; a highly-competitive program that is producing some of the best software engineers in the world.
      </h2>

      <div className="flex flex-col gap-2 pt-4 sm:flex-row">
        <NiceLink size="xl" className="group font-mono">
          <Handshake size={32} className="min-h-5 min-w-5 transition-all duration-100 group-hover:scale-110" />
          PARTNER
        </NiceLink>

        <NiceLink size="xl" className="group font-mono">
          <GraduationCap size={32} className="min-h-5 min-w-5 transition-all duration-100 group-hover:scale-110" />
          STUDY
        </NiceLink>
      </div>

      <PartnerCarousel />

      <Testimonal />
    </div>
  );
}
