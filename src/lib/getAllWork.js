import glob from 'fast-glob'
import * as path from 'path'

async function importWork(articleFilename) {
  let { meta, default: component } = await import(
    `../pages/works/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllWorks() {
  let worksFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/works'),
  })
  console.log(worksFilenames)
  return await Promise.all(worksFilenames.map(importWork))
}
