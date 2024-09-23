import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export function PageIntro({ eyebrow, title, children, centered = false }) {
  return (
    <Container
      className={clsx('mt-24 sm:mt-32 lg:mt-40', centered && 'text-center')}
    >
      <FadeIn>
        <h1>
          <span className="block font-display text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={clsx(
              'mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-zinc-800 [text-wrap:balance] dark:text-zinc-100 sm:text-6xl',
              centered && 'mx-auto'
            )}
          >
            {title}
          </span>
        </h1>
        <div
          className={clsx(
            'mt-6 max-w-3xl text-xl text-zinc-600 dark:text-zinc-400',
            centered && 'mx-auto'
          )}
        >
          {children}
        </div>
      </FadeIn>
    </Container>
  )
}
