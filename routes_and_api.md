## user based routes
- /api/home - user dashboard
- /api/admin - admin dashboard
- /api/register - user registeration 
- /api/login
- /login?include_auth_token

## transaction based api

- api/get
- api/create
- api/update/<trans_id>
- api/delete/<trans_id>

## transaction based routes

- api/pay/<trans_id> #changing internal status from "pending' to "paid
- api/delivery/<trans_id> 
- api/review/<trans_id> # changing internal status from "requested" to "pending"
- api/cancel/<trans_id> #  changing internal status from "pending" to "cancel"

## possible internal status
- requested
- pending 
- paid
- cancelled

## possible delivery status
- in-process
- in-transit
- dispatched
- out-for-delivery
- delivered