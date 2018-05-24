# Goodreads client side

### Link Deploy
http://goodreads.faipmardoni.net/

### Admin Account
email : admin@mail.com
password: Admin123!

### User Account
email : user@mail.com
password: Admin123!

### Usage
With only npm:
```
npm install
npm run serve

OR

npm install
npm run build
cd dist
live-server
```
### VALIDATE
email must be contains letter, numbers and  symbols
user can't review a book if he not login or ever review it's before

### PERMALINK

Route | HTTP | Description | Parameter
 ----- | ---- | ----------- | ---------
 [/users](/users) | POST | Register new user | name: string, email: string, password: string
 [/users/login](/users/login) | POST | Sign in | email: string, password: string
 [/books](/books/:id) | POST | Add a book (Authenticated user only) | apptoken: headers, judul: string, penerbit: string, penulit: string, image: file