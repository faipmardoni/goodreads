# TODO FANCY

### REST API SERVER

 List of users, books, & review routes:

 Route | HTTP | Description | Parameter
 ----- | ---- | ----------- | ---------
 [/users](/users) | POST | Register new user | name: string, email: string, password: string
 [/users/login](/users/login) | POST | Sign in | email: string, password: string
 [/books](/books/:id) | POST | Add a book (Authenticated user only) | apptoken: headers, judul: string, penerbit: string, penulit: string, image: file
 [/books](/books) | GET | View all books list |
 [/books/:id](/books/:id) | GET | View single view book |
 [/books/:id](/books/:id) | DELETE | Delete a Book (Authenticated user only) | Apptoken: Headers
 [/reviews](/reviews/:id) | POST | Add a Review (Authenticated user only) | apptoken: headers, judul: string, penerbit: string, penulit: string, image: file
 [/reviews](/reviews) | GET | View all reviews list |
 [/reviews/:id](/reviews/:id) | DELETE | Delete Review (Authenticated user only) | Apptoken: Headers


### Link API
http://server-goodreads.faipmardoni.net/

### Usage
With only npm:
```
npm install
npm start
```


````````
.env file

DBPASSWORD=zxcv12345
DBUSERNAME=faip5394
CLOUD_BUCKET=storagetestupload
GCLOUD_PROJECT=project-for-study-at-hacktiv8
KEYFILE_PATH=keyfile.json
MY_SECRET=PO!@fafsaf0912SDASD(((*@2

````````