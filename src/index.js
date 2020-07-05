import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
    uri: 'http://localhost:9090/graphql',
    request: (operation) => {
        // const token = localStorage.getItem('token')
        const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1EaEdSRFpGTWpVM05qRTROemsxUWtaQ05rTTBRalZFTkRsRU0wUTBRalZHUVRjek56QkdSQSJ9.eyJpc3MiOiJodHRwczovL2x5ZnRzaGlwcGluZy10ZXN0LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZGZkNDM5NjQ5ZDcwMjE1YjY1MTRhZjUiLCJhdWQiOiJGczVPNldRMEFyRHJQS0U4Y3phaXBKVzhmRTYxVFNQRiIsImlhdCI6MTU5Mzk3MTcxOCwiZXhwIjoxNTk0MDA3NzE4LCJhdF9oYXNoIjoiMGNqbEtFRkhaT0xOY2QwZDJOejhpUSIsIm5vbmNlIjoiRk9ZfnkxSk1NdHFObU1NNzdza0w4U1VnT0MyTnF1WC4ifQ.Ot7Ynrm6DNWpzN6k_nD940FPTBJV_pmCIs51QmRCxvt_czRbVyRo2mynIBn5L9l0-NYVO1hBMy8I3cmbI8GbkblmUeWfnP6zQIITPFmhlLk4NNgZsEW1VYOVrNYFlVZLRtzlpgGYc9Wy67gNv8RfemOsuEC6a0p10vXwiF_T-46_Ws8_E8U876MCEwdTZsp54WPzskJzy4jBobTsXepdmhrZZMEfmvANL7GYsVQreajc_4J8M5Gcy0Qf2WJWSxkiYRHEAN-TUbIVQWnz1gi02cPDaHVODDGewNYz7Dx2DSncSotFW36vrm6d_tdLZYA27l8K7VlIiYHBpPtqRhEzLQ`
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