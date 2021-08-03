import { useState, useRef } from 'react'
import { Element } from 'react-scroll'
import { Waypoint } from 'react-waypoint'
import cn from 'classnames'

// Components
import { Button } from 'reactstrap'
import TextBlock from '../TextBlock'

// Styles
import styles from './index.module.scss'

const ISI = ({ ...props }) => {
  const [showSticky, setShowSticky] = useState(true)
  const scrollRef = useRef(null)

  const handleISIEnter = () => {
    setShowSticky(false)
  }

  const handleISILeave = () => {
    setShowSticky(true)
  }

  const handleScrollTo = () => scrollRef.current.scrollIntoView()

  return (
    <section className={styles['isi-wrapper']}>
      <div
        className={cn(styles['sticky-wrapper'], { [styles.hide]: !showSticky })}
      >
        <Button onClick={handleScrollTo}>+</Button>
        <div className='centered-container'>
          <h3>Important Safety Information</h3>
          <p>
            Voluptate deserunt occaecat consequat occaecat officia officia.
            Ullamco quis quis id in consequat velit elit elit. Mollit incididunt
            reprehenderit nisi esse labore quis ad ut anim. Dolor ex sunt sunt
            amet amet elit dolor sint laboris eiusmod. Velit consequat in dolore
            ea aliqua pariatur incididunt aute sunt esse exercitation in.
            Consectetur irure occaecat culpa elit id labore. In qui anim irure
            incididunt id eu nulla laboris dolore enim adipisicing enim sunt eu.
            Nisi labore veniam sunt deserunt nisi officia amet elit. Ipsum et
            consequat enim aliquip commodo sint nulla aliqua labore deserunt
            est. Dolore officia laborum proident amet dolor. Dolore amet
            voluptate nostrud sunt anim elit duis enim tempor tempor.
          </p>
        </div>
      </div>

      <div ref={scrollRef} className='centered-container'>
        <h1>
          <u>Important Safety Information Persistent Element</u>
        </h1>
        <Element name='isi-persistent-element'>
          <div className='main-wrapper'>
            <Waypoint
              onEnter={handleISIEnter}
              onLeave={handleISILeave}
              bottomOffset={200}
            >
              <div className='centered-container'>
                <TextBlock />
                <TextBlock />
              </div>
            </Waypoint>
          </div>
        </Element>
      </div>
    </section>
  )
}

export default ISI
