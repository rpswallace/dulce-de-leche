import React from 'react'

import Hero from '../../components/shared/Hero/index'

export default {
  title: 'Base/Hero',
  component: Hero,
}

const Template = (args) => <Hero {...args} />

export const Default = Template.bind({})
