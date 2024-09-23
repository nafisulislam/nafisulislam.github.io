import glob from 'fast-glob'
import * as path from 'path'

async function importWork(articleFilename) {
  let { meta, default: component } = await import(
    `../pages/projects/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllWorks() {
  let worksFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/projects'),
  })
  console.log(worksFilenames)
  return await Promise.all(worksFilenames.map(importWork))
}
