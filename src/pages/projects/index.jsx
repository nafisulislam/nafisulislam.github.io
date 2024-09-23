import { NextSeo } from 'next-seo'
import { Border } from '@/components/Border'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllWorks } from '@/lib/getAllWork'
import { formatDate } from '@/lib/formatDate'
import siteMeta from '@/data/siteMeta'
import { FadeIn } from '@/components/FadeIn'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Blockquote } from '@/components/Blockquote'

// function Article({ article }) {
//   return (
//     <article className="md:grid md:grid-cols-4 md:items-baseline">
//       <Card className="md:col-span-3">
//         <Card.Title href={`/articles/${article.slug}`}>
//           {article.title}
//         </Card.Title>
//         <Card.Eyebrow
//           as="time"
//           dateTime={article.date}
//           className="md:hidden"
//           decorate
//         >
//           {formatDate(article.date)}
//         </Card.Eyebrow>
//         <Card.Description>{article.description}</Card.Description>
//         <Card.Cta>Read article</Card.Cta>
//       </Card>
//       <Card.Eyebrow
//         as="time"
//         dateTime={article.date}
//         className="mt-1 hidden md:block"
//       >
//         {formatDate(article.date)}
//       </Card.Eyebrow>
//     </article>
//   )
// }

function CaseStudies({ caseStudies }) {
  console.log(caseStudies)
  return (
    <SimpleLayout>
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          Case studies
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.client}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Image
                      src={caseStudy.logo}
                      alt=""
                      className="h-16 w-16 flex-none"
                      unoptimized
                    />
                    <h3 className="mt-6 text-sm font-semibold text-zinc-800 dark:text-zinc-100 sm:mt-0 lg:mt-8">
                      {caseStudy.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-zinc-800 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] dark:text-zinc-100 lg:mt-2 lg:after:hidden">
                      {caseStudy.service}
                    </p>
                    <p className="text-sm text-zinc-800 dark:text-zinc-100 lg:mt-2">
                      <time dateTime={caseStudy.date}>
                        {formatDate(caseStudy.date)}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-zinc-800 dark:text-zinc-100">
                    <Link href={caseStudy.href}>{caseStudy.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-zinc-600 dark:text-zinc-400">
                    {caseStudy.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={caseStudy.href}
                      aria-label={`Read case study: ${caseStudy.client}`}
                    >
                      Read case study
                    </Button>
                  </div>
                  {/* {caseStudy.testimonial && (
                    <Blockquote
                      author={caseStudy.testimonial.author}
                      className="mt-12"
                    >
                      {caseStudy.testimonial.content}
                    </Blockquote>
                  )} */}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </SimpleLayout>
  )
}

export default function Works({ works }) {
  const headline = 'I write about things I’m learning and things I’m building.'
  const intro =
    'All of my long-form thoughts on programming, leadership, infrastructure, and more, collected in chronological order.'
  console.log('------')
  console.log(works)
  return (
    <>
      <NextSeo
        title="Works - Md Nafisul Islam"
        description={siteMeta.description}
        canonical="https://nafis.ofpixel.com/works"
        openGraph={{
          url: 'https://nafis.ofpixel.com/works',
          images: [
            {
              url: `https://og.brian.dev/api/og?title=Articles&desc=${headline}`,
              width: 1200,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
          ],
          siteName: 'nafis.ofpixel.com',
        }}
      />
      <CaseStudies caseStudies={works} />
      {/* <SimpleLayout title={headline} intro={intro}>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout> */}
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      works: (await getAllWorks()).map(
        ({ component, ...metaData }) => metaData
      ),
    },
  }
}
