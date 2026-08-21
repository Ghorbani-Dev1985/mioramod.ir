'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

export interface RadialCarouselItem {
  image: string
  alt?: string
  href?: string
  title?: string
  category?: string
}

const R = 240
const THETA = 35

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 26, mass: 0.85 }

function arcStyle(offset: number) {
  const rad = (offset * THETA * Math.PI) / 180
  const abs = Math.abs(offset)
  return {
    x: R * Math.sin(rad),
    rotateY: -offset * THETA,
    scale: Math.max(0.48, 1 - abs * 0.16),
    opacity: abs > 2 ? 0 : Math.max(0.12, 1 - abs * 0.38),
    zIndex: 10 - abs,
  }
}

interface RadialCarouselProps {
  items: RadialCarouselItem[]
}

const RadialCarousel = ({ items: slides, }: RadialCarouselProps) => {
  const total = slides.length
  const [active, setActive] = React.useState(0)

  const go = React.useCallback((dir: 1 | -1) => setActive(i => (i + dir + total) % total), [total])

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])

  return (
    <div className='flex w-full flex-col items-center gap-8 py-8 select-none'>
      <div className='relative h-75 w-full'>
        {slides.map((slide, i) => {
          const raw = (i - active + total) % total
          const offset = raw > total / 2 ? raw - total : raw
          const { x, rotateY, scale, opacity, zIndex } = arcStyle(offset)

          const card = (
            <motion.div
              key={i}
              className='absolute top-0 left-1/2 cursor-pointer'
              style={{ width: 200, height: 280, marginLeft: -100, zIndex }}
              animate={{ x, rotateY, scale, opacity }}
              transition={SPRING}
              onClick={() => setActive(i)}
              aria-label={slide.title ?? slide.alt ?? ''}
            >
              <div className='relative size-full overflow-hidden rounded-2xl shadow-lg'>
                <img src={slide.image} alt={slide.alt ?? ''} className='size-full object-cover' draggable={false} />

                <div className='from-primary/70 via-primary/5 absolute inset-0 bg-linear-to-t to-transparent' />

                {(slide.title || slide.category) && (
                  <motion.div
                    className='absolute inset-x-0 bottom-0 px-4 pb-5'
                    animate={{ opacity: offset === 0 ? 1 : 0, y: offset === 0 ? 0 : 12 }}
                    transition={{ duration: 0.28 }}
                  >
                    {slide.category && (
                      <span className='text-primary-foreground text-[10px] font-medium tracking-[0.18em] uppercase'>
                        {slide.category}
                      </span>
                    )}
                    {slide.title && (
                      <p className='text-primary-foreground mt-0.5 text-sm leading-snug font-semibold'>{slide.title}</p>
                    )}
                  </motion.div>
                )}

                <motion.div
                  className='pointer-events-none absolute inset-0 rounded-2xl'
                  animate={{ opacity: offset === 0 ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
          )

          return slide.href ? <Link key={i} href={slide.href}>{card}</Link> : card
        })}
      </div>
    </div>
  )
}

export default RadialCarousel
