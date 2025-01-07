import AnimatedHeroText from "@/components/animated-hero";
import { PartnerCarousel } from "@/components/partners-carousel";
import { Testimonal } from "@/components/testimonials";
import { NiceLink } from "@/components/ui/nice-link";
import { GraduationCap, Handshake } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-screen flex-col px-8 pt-12 md:pt-16">
      <AnimatedHeroText text="The next generation computer science course." emphasis={[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]} />

      {/*
      <h1 className="flex flex-wrap pt-10 font-mono text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        The computer science course for the <span className="font-bold">Next Generation</span>.
      </h1>
      */}

      <h2 className="w-3/4 pt-3 font-mono text-gray-800 dark:text-neutral-300 lg:pt-0">
        Immersive Software Engineering is a radical leap forward; a highly-competitive program that is producing some of the best software engineers in the world.
      </h2>
      <div className="flex gap-4 pt-4 sm:flex-row">
        <NiceLink size="xl" className="group font-mono">
          <Handshake size={24} className="min-h-5 min-w-5 transition-all duration-100 group-hover:scale-110" />
          PARTNER
        </NiceLink>

        <NiceLink size="xl" className="group font-mono">
          <GraduationCap size={24} className="min-h-5 min-w-5 transition-all duration-100 group-hover:scale-110" />
          STUDY
        </NiceLink>
      </div>

      <PartnerCarousel />

      <Testimonal />
    </div>
  );
}
