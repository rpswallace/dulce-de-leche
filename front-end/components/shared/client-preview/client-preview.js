// NextJS
import Link from 'next/link'

// Libraries
import { List, ListInlineItem } from 'reactstrap';

const ClientPreview = ({ client }) => {
  return (
    <List type="inline">
      <ListInlineItem className="test">
        <p>
          <span className="title">Client:</span>
          { client.name} { client.firstName } { client.lastName }
        </p>
        <p>
          <span className="title">Phone:</span>
          { client.phone }
        </p>
        <p>
          <span className="title">Phone:</span>
          { client.email }
        </p>
        <p>
          <span className="title">WhatsApp Me:</span>
          <Link href={`https://api.whatsapp.com/send?phone=${ client.phone }`}>
            <a target="_blank" rel="noopener noreferrer">WhatsApp Me</a>
          </Link>
        </p>
      </ListInlineItem>
    </List>
  )
}

export default ClientPreview



