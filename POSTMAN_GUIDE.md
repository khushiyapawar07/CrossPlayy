# Postman Guide

Use this guide with the ready-to-import files in the [postman](postman) folder.

## Base URL

Use `http://localhost:8000/api` for local development. If your backend runs on another port, change the Postman environment variable `baseUrl`.

## Files

- [Postman collection](postman/CrossPlayy.postman_collection.json)
- [Postman environment](postman/CrossPlayy.postman_environment.json)

## Import Steps

1. Open Postman.
2. Click **Import**.
3. Import both files from the `postman` folder.
4. Select the **CrossPlayy Local** environment.
5. Paste your JWT token into `token`.
6. Paste your admin JWT token into `adminToken` if you want to test admin-only create, update, and delete routes.

## How To Test CRUD

### Create

Use `POST` with JSON body.
- Stations: `POST {{baseUrl}}/stations`
- Food: `POST {{baseUrl}}/food`
- Bookings: `POST {{baseUrl}}/bookings`

### Update

Use `PUT` with the target resource id.
- Stations: `PUT {{baseUrl}}/stations/:id`
- Food: `PUT {{baseUrl}}/food/:id`
- Bookings: `PUT {{baseUrl}}/bookings/:id`
- Profile: `PUT {{baseUrl}}/auth/profile`

### Delete

Use `DELETE` with the target resource id.
- Stations: `DELETE {{baseUrl}}/stations/:id`
- Food: `DELETE {{baseUrl}}/food/:id`
- Bookings: `DELETE {{baseUrl}}/bookings/:id`

## Auth Header

For protected routes, add:

```http
Authorization: Bearer {{token}}
```

For admin-only routes, replace `token` with `adminToken`.

## Notes

- Station and food create/update requests send JSON, not file uploads.
- If you want image uploads later, the backend must be changed to accept multipart form data or a separate upload service.