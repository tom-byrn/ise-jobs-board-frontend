import { Button } from "@/components/ui/button";
import { GraduationCap, Handshake } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-full w-screen flex-col pl-4">
      { /**
        <h1 className="text-9xl font-extrabold text-slate-800 flex flex-row items-center justify-center">
          <span>[</span>
          <span className="pt-4">ISE</span>
          <span>]</span>
        </h1>
        **/}

      <h1 className="font-mono text-7xl pt-8">
        The next-generation <br />Computer Science course.
      </h1>
      <h2 className="font-mono text-gray-800 dark:text-neutral-300 w-3/4">
        Immersive Software Engineering is a radical leap forward; a highly-competitive program that is producing some of the best software engineers in the world.
      </h2>

      <div className="flex flex-row gap-x-2 pt-4">
        <Button size="xl"><Handshake size={32} className="min-w-5 min-h-5" /> Partner</Button>
        <Button size="xl"><GraduationCap size={32} className="min-w-5 min-h-5" /> Study</Button>
      </div>
    </div>
  );
}
