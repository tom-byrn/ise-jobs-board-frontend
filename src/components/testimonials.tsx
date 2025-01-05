import Image from "next/image"

import JOHN_COLLISON_PHOTO from "/public/john-collison.jpg"
import MIKE_MORRISSEY_PHOTO from "/public/mike-morrissey.jpg"
import { MessageSquareQuote, Quote } from "lucide-react"
import { Button } from "./ui/button"

export const Testimonal = () => {
  return (
    <>
      <div className="flex flex-col gap-16 px-4 pt-16 lg:flex-row lg:px-8">
        <div className="flex flex-col items-center gap-y-4 sm:flex-row">
          <Image className="max-h-[200px] rounded-full" width={200} height={200} src={JOHN_COLLISON_PHOTO} alt="A photo of John Collison" />
          <div className="ml-4 flex flex-col font-mono">
            <span><Quote size={24} className="inline" /> Software engineering is a wonderful career. Immersive Software Engineering gets students writing code in the real world as quickly as possible, so they’re ready to join today’s leading companies or start Ireland’s next breakout startup.</span>
            <span className="mt-2 text-neutral-700 dark:text-neutral-400">John Collison</span>
            <span className="text-neutral-600 dark:text-neutral-500">Entrepreneur, co-founder of Stripe</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-4 sm:flex-row">
          <Image className="max-h-[200px] rounded-full" width={200} height={200} src={MIKE_MORRISSEY_PHOTO} alt="A photo of John Collison" />
          <div className="ml-4 flex flex-col font-mono">
            <span><Quote size={24} className="inline" /> We gave them something that we thought would take them three months and they finished in three weeks. That was the incredible nature of what they were able to achieve because of the talent, because of the training they got and because of the immersement in industry</span>
            <span className="mt-2 text-neutral-700 dark:text-neutral-400">Mike Morrissey</span>
            <span className="text-neutral-600 dark:text-neutral-500">Catalyst Director, Analog Devices</span>
          </div>
        </div>
      </div>

      <Button variant="secondary" className="group mb-20 ml-8 mt-6 max-w-fit place-self-center font-mono">
        <MessageSquareQuote className="transition-all duration-100 group-hover:-translate-y-0.5" />
        See more testimonials
      </Button>
    </>
  )
}
