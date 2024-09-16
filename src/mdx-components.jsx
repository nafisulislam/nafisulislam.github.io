import { MDXComponents } from '@/components/MDXComponents'

export function useMDXComponents(components) {
  console.log('using MDXComponents')
  console.log(MDXComponents)
  return {
    ...components,
    ...MDXComponents,
  }
}
