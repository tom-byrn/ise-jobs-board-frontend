"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import STRIPE_LOGO from "/public/partner-logos/stripe.png"
import AWS_LOGO from "/public/partner-logos/aws.png"
import ANALOG_DEVICES_LOGO from "/public/partner-logos/analog-devices.png"
import BD_LOGO from "/public/partner-logos/bd.png"
import BOSTON_SCIENTIFIC_LOGO from "/public/partner-logos/boston-scientific.png"
import DELL_LOGO from "/public/partner-logos/dell.png"
import FIDELITY_LOGO from "/public/partner-logos/fidelity.png"
import INTERCOM_LOGO from "/public/partner-logos/intercom.png"
import MANNA_LOGO from "/public/partner-logos/manna.png"
import PROVIZIO_LOGO from "/public/partner-logos/provizio.png"
import TINES_LOGO from "/public/partner-logos/tines.png"
import TRANSACT_LOGO from "/public/partner-logos/transact.png"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"

export function PartnerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )

  const logos = [STRIPE_LOGO, AWS_LOGO, ANALOG_DEVICES_LOGO, BD_LOGO, BOSTON_SCIENTIFIC_LOGO, DELL_LOGO, FIDELITY_LOGO, INTERCOM_LOGO, MANNA_LOGO, PROVIZIO_LOGO, TINES_LOGO, TRANSACT_LOGO]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mt-8"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from(logos).map((logo, index) => (
          <CarouselItem key={index} className="max-w-44 basis-1/2 md:max-w-60 md:basis-1/3 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image src={logo} alt="Company logo" className="invert dark:invert-0" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
