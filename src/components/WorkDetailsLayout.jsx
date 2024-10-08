import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'

export function WorkDetailsLayout({ children, meta }) {
  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow="Case Study" title={meta.title} centered>
            <p>{meta.description}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-zinc-200 bg-white/50 dark:border-zinc-600 dark:bg-zinc-800/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-zinc-800 dark:text-zinc-100 sm:mx-0 sm:grid-cols-3">
                    <div className="border-t px-6 py-4 text-zinc-800 first:border-t-0 dark:border-zinc-600 dark:text-zinc-100 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Client</dt>
                      <dd>{meta.client}</dd>
                    </div>
                    <div className="border-t px-6 py-4 first:border-t-0 dark:border-zinc-600 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Year</dt>
                      <dd>
                        <time dateTime={meta.date.split('-')[0]}>
                          {meta.date.split('-')[0]}
                        </time>
                      </dd>
                    </div>
                    <div className="border-t border-zinc-200 px-6 py-4 first:border-t-0 dark:border-zinc-600 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Service</dt>
                      <dd>{meta.service}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            <div className="border-y border-zinc-200 bg-neutral-100 dark:border-zinc-600 dark:bg-[#18181a]">
              <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">
                <GrayscaleTransitionImage
                  {...meta.image}
                  quality={90}
                  className="w-full"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </header>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <MDXComponents.wrapper>{children}</MDXComponents.wrapper>
          </FadeIn>
        </Container>
      </article>
    </>
  )
}
