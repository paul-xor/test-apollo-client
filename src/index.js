import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
    uri: 'http://localhost:9090/graphql',
    request: (operation) => {
        // const token = localStorage.getItem('token')
        const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1EaEdSRFpGTWpVM05qRTROemsxUWtaQ05rTTBRalZFTkRsRU0wUTBRalZHUVRjek56QkdSQSJ9.eyJpc3MiOiJodHRwczovL2x5ZnRzaGlwcGluZy10ZXN0LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZjAyMzViM2IwN2U5MDAwMTllYmEzMzgiLCJhdWQiOiJGczVPNldRMEFyRHJQS0U4Y3phaXBKVzhmRTYxVFNQRiIsImlhdCI6MTYwNDUxODIzMywiZXhwIjoxNjA0NTU0MjMzLCJhdF9oYXNoIjoiYlV2cEhhTnZ3ZFhBTTBoWFNPaUhCdyIsIm5vbmNlIjoicWxtenNuZ1h6Uk1qd09mdUwwNGVPVjR1ZmxjSWI3cmcifQ.BcR6UFvBcPOSQWZ8yJXCozjLCnWi6SgyqwfqNxTHCD_yZtbmIMeU3uenYyBWjRcMz7-s4gYh3IACUSgx_RbuMU02PrxQ9uJr33R0BydG6j8qhNi6UqB75s1QCD3kGagmfIZr_WnBuV03qq1hfvohRQWaZncrpv4T4fiBI1lt-ctwCdoCR2BCzkgRAf6rt6UOJwhPSYHUn_gJ6_VusQAJCqIXn-6aLIUc1E5ZLVibhsUIceuXY2MTY6lpclicVKJdaX6cngFeP3QdzSi0TMYXI8CJgbzF_bVsbVgUNSl5OhVOHUgSu8TX3-AeSs9yyYlBPiaM1LTNTdulHlcIKo8jJQ`
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
    }
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
    let html = ''
    // html += response.data.shipments.shipments[0];

    response.data.shipments.shipments.forEach((shipment) => {
        html += `
            <div>
                <h4>${shipment.shipmentId} - ${shipment.customer.useName}</h4>
                <h5>Packages: ${shipment.packages.length}</h5>

            </div>
        `
    })
    document.getElementById('shipments').innerHTML = html;
})

const getUsers = gql`
query listUsers($skip:Int, $limit:Int) {
  users(skip:$skip, limit: $limit) {
    count
    users{
      id
      email
      firstName
      lastName
    }
  }
}
`

client.query({ query: getUsers }).then((response) => {
    //console.log(response.data);

    let html = ''
    response.data.users.users.forEach((user) => {
        html += `
            <div>
                <h5>User: ${user.id}, email: ${user.email}</h5>
                <p> firstName: ${user.firstName}, lastName: ${user.lastName}</p>
            </div>
        `
    })

    document.getElementById('users').innerHTML = html;
})