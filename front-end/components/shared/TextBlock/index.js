// Styles
import styles from './index.module.scss'

const TextBlock = ({ title }) => {
  return (
    <div className={styles['text-block-wrapper']}>
      {title ? (
        <h4>{title}</h4>
      ) : (
        <h4>Adipisicing minim voluptate do veniam adipisicing.</h4>
      )}
      <p>
        Voluptate deserunt occaecat consequat occaecat officia officia. Ullamco
        quis quis id in consequat velit elit elit. Mollit incididunt
        reprehenderit nisi esse labore quis ad ut anim. Dolor ex sunt sunt amet
        amet elit dolor sint laboris eiusmod. Velit consequat in dolore ea
        aliqua pariatur incididunt aute sunt esse exercitation in. Consectetur
        irure occaecat culpa elit id labore. In qui anim irure incididunt id eu
        nulla laboris dolore enim adipisicing enim sunt eu. Lorem occaecat
        fugiat esse et ea deserunt sunt. Adipisicing sit anim voluptate cillum
        aliqua dolor et nostrud dolor exercitation ut eiusmod excepteur. Commodo
        ullamco occaecat do mollit do est officia anim consectetur incididunt
        exercitation. Duis do id eiusmod nulla laborum fugiat pariatur amet duis
        occaecat ad. Eu enim velit nostrud aliquip ipsum nulla fugiat ex
        exercitation irure nulla aute exercitation deserunt. Nulla eu excepteur
        ad est excepteur do Lorem ex. Eiusmod exercitation esse dolor elit nisi
        laboris qui ea. Dolore elit ad laboris elit et. Tempor et sint proident
        eu voluptate ut quis tempor id nisi nulla. Excepteur non culpa cupidatat
        deserunt culpa officia eiusmod culpa magna ut enim culpa. Voluptate duis
        qui sunt labore commodo enim minim mollit duis. Ullamco occaecat cillum
        sit non laborum ea excepteur adipisicing proident non incididunt in.
        Nisi pariatur aute incididunt deserunt anim ut minim reprehenderit
        labore. Officia elit duis aute velit commodo esse proident ea consequat
        sunt voluptate eiusmod. Reprehenderit laboris tempor aliquip
        reprehenderit pariatur. Aute eiusmod dolor deserunt proident excepteur
        minim sint Lorem ex proident proident consequat cupidatat. Consequat
        incididunt ut sunt sit. Aute consequat veniam laboris aliqua ullamco non
        cillum duis irure deserunt sunt minim reprehenderit magna. Consectetur
        excepteur elit mollit laboris elit laboris consequat sint dolor eiusmod
        enim laborum velit. Et eu ea labore do sint commodo adipisicing eu
        nostrud. Et do labore laborum deserunt. Eu velit dolor laboris ad
        consequat. Laborum sunt laboris anim eu occaecat Lorem et irure commodo
        consequat eiusmod anim.
      </p>
    </div>
  )
}

export default TextBlock
