import ApolloBoost, {gql} from 'apollo-boost'

const client = new ApolloBoost({
    uri: 'http//localhost:9090'
})

const getShipments = gql `
    query {
        shipments {
            id
            
        }
    }
`

client.query({
    query
})