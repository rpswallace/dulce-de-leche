// Components
import HeadMetadata from '../components/shared/HeadMetadata'
import Main from '../components/layouts/Main'
import Hero from '../components/shared/Hero'
import TextBlock from '../components/shared/TextBlock'
import UserList from '../components/user-list'
import ModalExample from '../components/modal-example'

// Utils
import API from '../utils/api'

export default function Home({ users }) {
  const SEO_TAGS = {
    title: 'NextJS Base Code',
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
    <Main className='home-page'>
      <HeadMetadata seotags={SEO_TAGS} />
      <Hero />
      <main className='centered-container'>
        <UserList users={users} />
        <TextBlock title='Text Block Example' />
        <ModalExample />
      </main>
    </Main>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get brands.
  // You can use any data fetching library
  const res = await API.getRequest('/users')
  const users = res.data

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  }
}
