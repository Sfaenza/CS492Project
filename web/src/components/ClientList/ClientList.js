import ClientListItem from 'src/components/ClientListItem'
import NewClient from 'src/components/NewClient/NewClient'
import { useState } from 'react'
import { useQuery } from '@redwoodjs/web'

export const GET_CLIENTS = gql`
  query ClientListQuery($trainerId: Int!) {
    clients(trainerId: $trainerId) {
      id
      name
      email
    }
  }
`

const ClientList = () => {
  const [isVisible, setVisibility] = useState(false)

  const openTraineeList = () => {
    setVisibility(true)
  }

  const { refetch, loading, data } = useQuery(GET_CLIENTS, {
    variables: { trainerId: 1 },
  })

  return (
    <div className="clientListHeader">
      <h3>Client List</h3>
      <button onClick={openTraineeList}>Add Client +</button>
      {isVisible && (
        <NewClient setVisibility={setVisibility} refreshClients={refetch} />
      )}
      <div className="clientList">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.clients.map((client) => (
            <ClientListItem
              key={client.id}
              user={client}
              refreshClients={refetch}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default ClientList