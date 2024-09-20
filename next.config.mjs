import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkCodeTitles from './src/lib/remark-code-title.mjs'
import rehypePresetMinify from 'rehype-preset-minify'
import { unifiedConditional } from 'unified-conditional'
import escapeStringRegexp from 'escape-string-regexp'
import rehypeShiki from '@leafac/rehype-shiki'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import shiki from 'shiki'
import { recmaImportImages } from 'recma-import-images'
import remarkUnwrapImages from 'remark-unwrap-images'
import * as path from 'path'
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  output: 'export',
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
  },
}

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree) => {
    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      }
    )
  }
}

export default async function config() {
  let highlighter = await shiki.getHighlighter({
    theme: 'css-variables',
  })

  let withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [
        [rehypeShiki, { highlighter }],
        [
          remarkRehypeWrap,
          {
            node: { type: 'mdxJsxFlowElement', name: 'Typography' },
            start: ':root > :not(mdxJsxFlowElement)',
            end: ':root > mdxJsxFlowElement',
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        remarkUnwrapImages,
        [
          unifiedConditional,
          // [
          //   new RegExp(`^${escapeStringRegexp(path.resolve('src/work'))}`),
          //   [[remarkMDXLayout, '@/work/wrapper', 'caseStudy']],
          // ],
        ],
      ],
    },
  })

  return withMDX(nextConfig)
}

// const withMDX = nextMDX({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [
//       remarkGfm,
//       remarkCodeTitles,
//       [
//         unifiedConditional,
//         [
//           new RegExp(`^${escapeStringRegexp(path.resolve('src/work'))}`),
//           [[remarkMDXLayout, '@/work/wrapper', 'caseStudy']],
//         ],
//       ],
//     ],
//     rehypePlugins: [
//       [rehypeShiki],
//       [
//         remarkRehypeWrap,
//         {
//           node: { type: 'mdxJsxFlowElement', name: 'Typography' },
//           start: ':root > :not(mdxJsxFlowElement)',
//           end: ':root > mdxJsxFlowElement',
//         },
//       ],
//     ],
//     providerImportSource: '@mdx-js/react',
//   },
// })

// export default withMDX(nextConfig)
