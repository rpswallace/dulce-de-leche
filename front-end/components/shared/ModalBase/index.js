import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Link from 'next/link'

const ModalBase = ({ children, ...props }) => {
  const { title, buttonLabel, className, type, exitTo } = props
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  return (
    <div>
      <Button color='danger' onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        {type === 'simple' && (
          <div>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
          </div>
        )}

        {type === 'exit' && (
          <div>
            <ModalHeader toggle={toggle}>
              You&apos;re exiting the website
            </ModalHeader>
            <ModalBody>
              <p>You&apos;re being redirected to {exitTo}</p>
            </ModalBody>
            <ModalFooter>
              <Link href={exitTo}>
                <a target='_blank'>Proceed</a>
              </Link>
              <Button color='secondary' onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ModalBase
