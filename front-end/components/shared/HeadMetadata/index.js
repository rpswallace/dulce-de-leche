import Head from 'next/head'

const HeadMetadata = ({ seotags }) => {
  return (
    <Head>
      <title>{seotags.title}</title>
      <meta name='url' content={seotags.shortlink} />
      <meta name='description' content={seotags.description} />
      <meta name='keywords' content={seotags.keywords} />

      <link rel='icon' href='/favicon.ico' />
      <link rel='shortlink' href={seotags.shortlink} />
      <link rel='canonical' href={seotags.canonical} />

      <meta property='og:title' content={seotags.og_title} />
      <meta property='og:url' content={seotags.og_url} />
      <meta property='og:image' content={seotags.og_image} />
      <meta property='fb:admins' content={seotags.fb_admins} />
      <meta property='og:site_name' content={seotags.og_site_name} />
      <meta property='og:description' content={seotags.og_description} />
      <meta property='og:type' content={seotags.og_type} />

      {/* <meta name='twitter:card' content={seotags.twitter_card} />
      <meta name='twitter:title' content={seotags.twitter_title} />
      <meta name='twitter:description' content={seotags.twitter_description} /> */}
      {/* <meta name="twitter:image:src" content={seotags.twitter_image} /> */}
      {/* <meta name="twitter:site" content={seotags.twitter_site} />
      <meta name="twitter:creator" content={seotags.twitter_creator} /> */}

      {/* <meta itemprop="author" content={seotags.google_author} />
      <meta itemprop="publisher" content={seotags.google_publisher} />
      <meta itemprop="name" content={seotags.google_name} />
      <meta itemprop="description" content={seotags.google_description} />
      <meta itemprop="image" content={seotags.google_image} /> */}
    </Head>
  )
}

export default HeadMetadata
