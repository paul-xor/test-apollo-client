import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
    uri: 'http://localhost:9090/graphql'
})


const getShipments = gql`
query listShipments($skip:Int, $limit: Int) {
    shipments(skip:$skip, limit: $limit){
            count
            shipments{
            id
            shipmentId
            customer{
                customerId
                useName
                legalName
            }
            packages{
                packageType
                pcs
                commodity
                heigth
                width
                lenght
                dg
            }
            }
        }
    }
`

client.query({
    query: getShipments
}).then((response) => {
    console.log(response.data);
})