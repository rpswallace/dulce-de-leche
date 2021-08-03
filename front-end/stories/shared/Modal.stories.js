import React from 'react'

import ModalBase from '../../components/shared/ModalBase/index'

export default {
  title: 'Base/ModalBase',
  component: ModalBase,
}

const TemplateSimple = () => (
  <ModalBase type='simple' buttonLabel='Simple Modal' title='Simple Modal'>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a
      porta ex, bibendum elementum libero. Nunc ut dolor et lacus bibendum
      semper. In aliquet ex eros, et pretium lorem vehicula et. Nulla sed ligula
      egestas, iaculis metus et, cursus turpis. Nam dictum elit eu enim
      malesuada molestie. Donec id lacus scelerisque, rutrum orci eget, sagittis
      urna. Phasellus et erat rutrum, finibus est sit amet, finibus ipsum.
      Suspendisse fringilla velit quam, nec commodo est gravida non.
    </p>
  </ModalBase>
)

const TemplateExitLink = () => (
  <ModalBase
    type='exit'
    exitTo='https://www.google.com/'
    buttonLabel='Exit Link'
  />
)

export const Simple = TemplateSimple.bind({})
export const ExitLink = TemplateExitLink.bind({})
