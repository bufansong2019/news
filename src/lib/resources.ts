const PDF_BASE_URL = 'https://public.f1sh.org/news'

export function pdfUrl(filename: string): string {
  return `${PDF_BASE_URL}/${filename}`
}

export const resourceCatSlugs: Record<string, string> = {
  zhenti: '真题试卷',
  beikao: '备考教材',
  other: '其他资料',
}

export const resourceCategories = Object.keys(resourceCatSlugs)

export const categoryToSlug: Record<string, string> = Object.fromEntries(
  Object.entries(resourceCatSlugs).map(([k, v]) => [v, k])
)
