import { NextSeo } from 'next-seo'
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import siteMeta from '@/data/siteMeta'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      {/* <Card.Eyebrow decorate>{event}</Card.Eyebrow> */}
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export default function Speaking() {
  return (
    <>
      <NextSeo
        title="Side Projects - Md Nafisul Islam"
        description={siteMeta.description}
        canonical="https://nafis.ofpixel.com/miscellaneous"
        openGraph={{
          url: 'https://nafis.ofpixel.com/miscellaneous',
          images: [
            {
              url: `https://og.nafis.ofpixel.com/api/og?title=miscellaneous&desc=I’ve spoken at events all around the world and been interviewed for many podcasts.`,
              width: 1200,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
          ],
          siteName: 'brian.dev',
        }}
      />
      <SimpleLayout
        title="Side Projects I am Proud of"
        intro="Apart from my day to day jobs I have spent time learning outside of my scope various technologies to challenge myself build something
        fresh and new. Here is the list of projects I have done as side projects"
      >
        <div className="space-y-20">
          <SpeakingSection title="Flutter">
            <Appearance
              href="https://biouilyn.github.io/noir"
              title="Noir"
              description="Developed an e-commerce app allowing users to browse, search, and purchase proucts seamlessly"
              event="GopherCon Russia 2018"
              cta="Watch demo"
            />
            <Appearance
              href="https://biouilyn.github.io/demo-site/"
              title="Biotic"
              description="Created a telemedicine platform with features for booking health services and connecting patients with healthcare professionals"
              cta="Watch demo"
            />
          </SpeakingSection>
          {/* <SpeakingSection title="Podcasts">
            <Appearance
              href="https://popcast-d9f7b6dc.simplecast.com/episodes/episode-76-go-roadhouse-with-microsofts-brian-ketelsen"
              title="

              Episode 76 - GO Roadhouse with Microsoft's Brian Ketelsen"
              description="Go, Guitars, Roadhouse, and so much more with Dan Papandrea."
              event="The POPCAST, July 7, 2021"
              cta="Listen to podcast"
            />
          </SpeakingSection> */}
        </div>
      </SimpleLayout>
    </>
  )
}
