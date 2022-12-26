# books-store-crud-app
A simple books store crud application

#Authentication
For Authentication purpose created register and login api's
Register user with username and password 
  --> @POST http://localhost:5000/auth/register
  --> username should be a email with domain/tlds as com (or) net
  --> password should be a string of min length 3 and max of 15
Login using the credentials to get the authentication token to get access to all the books crud oprn. api's
  --> @POST http://localhost:5000/auth/login
  --> Token will be expired after 2h.
  --> Once the token is expired please login again to get the token.

Get all the books
@GET http://localhost:5000/books

Get Books by ID
@GET http://localhost:5000/books/:id

Get books with book name or author
@GET http://localhost:5000/books?name=
@GET http://localhost:5000/books?author=

Create books
@POST http://localhost:5000/books/create
sample payload
  {
        "name": "Buddha and his lessons",
        "imageurl": "https://www.google.com/search?q=procrastination+books&rlz=1C1CHBF_enIN1013IN1014&tbm=isch&sxsrf=ALiCzsZZBESZBeSOqrCaR1V6bFYisc3heQ:1671957706584&source=lnms&sa=X&ved=2ahUKEwjlsrjpr5T8AhUx-jgGHcC4Ai0Q_AUoAXoECAEQAw&biw=1280&bih=577&dpr=1.5#imgrc=BGNDy-j75mhIOM",
        "author": "Jameson Rocker G",
        "pages": "250",
        "price": "279"
    }
  
Update books with the Id
@PUT http://localhost:5000/books/update/10
sample payload
{
  "pages": "500",
  "price": "299"
}

Delete books wth their Id
@DELETE http://localhost:5000/books/8
