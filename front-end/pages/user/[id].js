// Components
import HeadMetadata from '../../components/shared/HeadMetadata'
import Main from '../../components/layouts/Main'
import UserInfo from '../../components/user-info'

// Utils
import API from '../../utils/api'

export default function Brand({ user }) {
  const SEO_TAGS = {
    title: user.name,
    shortlink: '',
    description: '',
    canonical: '',
    og_title: '',
    og_url: '',
    og_image: '',
    fb_admins: '',
    og_site_name: '',
    og_description: '',
    twitter_card: '',
    twitter_title: '',
    twitter_description: '',
  }

  return (
    <Main className='user-page'>
      <HeadMetadata seotags={SEO_TAGS} />
      <main className='centered-container'>
        <UserInfo user={user} />
      </main>
    </Main>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await API.getRequest('/users')
  const users = res.data

  // Get the paths we want to pre-render based on posts
  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the brand `id`.
  // If the route is like /brand/nike, then params.id is nike
  const res = await API.getRequest(`/users/${params.id}`)
  const user = res.data

  // Pass post data to the page via props
  return { props: { user } }
}
