import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description?: string
}

const SITE_NAME = '软考通资讯站'
const DEFAULT_DESC = '软考备考资讯、政策通知、学习经验分享'

export default function SEO({ title, description }: SEOProps) {
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} - ${SITE_NAME}`
  const desc = description || DEFAULT_DESC

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
    </Helmet>
  )
}
