#### Back-End

**/--------------------------------------------/ AUTH ROUTES /-----------------------------------/**

**Register a User**
_method url_: `/api/auth/register`

_http method_: **[POST]**

#### Body

| name       | type   | required | description    |
| ---------- | ------ | -------- | -------------- |
| `username` | String | Yes      | Must be unique |
| `password` | String | Yes      |                |

#### Example

ID is generated by the API

```
  {
    "id": 4
    "username": "elijah",
    "password": "coolpassword",
  }
```

###### Example payload

Endpoint: /api/articles/4

```
{
	"name": "Yahoo",
   "url": "yahoo.com",
   "publisher": "Bob Ross",
   "description": "How to use Yahoo like Bob Ross"
}
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "id": 4,
    "username": "elijah",
  }
```

##### 404 (Not Found)

```
  {
    "message": "Login details invalid"
  }
```

##### 500 (Server error)

```
  {
    "message": "something went wrong",
  }
```

**/----------------------------------------/**

### **Login a user**

_method url_: `/api/auth/login`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description             |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | must be registered user |
| `password` | String | Yes      | password must match     |

#### Example

```
  {
    "username": "test1",
    "password": "test"
  }
```

#### Response

##### 200 (ok)

###### Example response

```
  {
    "userId": 1,
    "welcome": "Welcome, test1!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5MDA5OTM1NSwiZXhwIjoxNTkwMTA2NTU1fQ.OVhXcNtZEVrP90SReXOp_tfJ17KUAvzOBvp_9degxDs"
  }
```

##### 428 (Precondition failed)

```
  {
    message: "Login details invalid"
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid password"
  }
```

##### 500 (Bad Request)

```
  {
    message: "something went wrong",
  }
```

**/--------------------------------------------/ CATEGORY ROUTES /-----------------------------------/**

### **Get categories**

_method url_: `/api/categories`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
  [
  {
    "category_name": "Health"
  },
  {
    "category_name": "Educational"
  },
  {
    "category_name": "Sports"
  },
  {
    "category_name": "Technology"
  },
  {
    "category_name": "History"
  }
]
```

##### 404 (Bad Request)

Body was empty

```
  {
    message: "can't find categories"
  }
```

##### 500 (Bad Request)

```
  {
    message: "something went wrong",
  }
```

**/----------------------------------------/**

**/--------------------------------------------/ ARTICLE ROUTES /-----------------------------------/**

### **Get articles**

_method url_: `/api/articles`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
  {
    "id": 11,
    "name": "Test Name",
    "url": "google.com",
    "publisher": "Bob Ross",
    "description": "How to paint like Bob Ross",
    "user_id": 1
  }
]
```

Each article has its own id and a user_id. The user id points to the user the article is saved to.

##### 404 (Not Found)

Body was empty

This will not throw an error, it will just return an empty array is the user has no saved articles.

##### 500 (Bad Request)

```
  {
    message: "something went wrong",
  }
```

**/----------------------------------------/**

### **Add articles**

_method url_: `/api/articles`

_http method_: **[POST]**

#### Response

##### 200 (ok)

###### Example response

```
{
  "id": 11,
  "user_id": 1,
  "name": "Test Name",
  "url": "google.com",
  "publisher": "Bob Ross",
  "description": "How to paint like Bob Ross"
}
```

##### 400 (Bad Request)

```
{
  "message": "Missing info"
}
```

All fields (name, url, pusblisher, description) are required.

##### 500 (Bad Request)

```
  {
    message: "something went wrong",
  }
```

**/----------------------------------------/**

### **Edit articles**

_method url_: `/api/articles/:id`

_Takes article's ID_

_http method_: **[PUT]**

#### Response

##### 200 (ok)

###### Example payload

Endpoint: /api/articles/4

```
{
	"name": "Yahoo",
   "url": "yahoo.com",
   "publisher": "Bob Ross",
   "description": "How to use Yahoo like Bob Ross"
}
```

###### Example response

```
[
  {
    "id": 4,
    "name": "Yahoo",
    "url": "yahoo.com",
    "publisher": "Bob Ross",
    "description": "How to use Yahoo like Bob Ross",
    "user_id": 1
  }
]
```

##### 400 (Bad Request)

```
{
  "message": "Missing info"
}
```

All fields (name, url, pusblisher, description) are still required (none can be blank).

##### 500 (Bad Request)

```
  {
    message: "something went wrong",
  }
```

**/----------------------------------------/**

### **Delete articles**

_method url_: `/api/articles/:id`

_Takes article's ID_

_http method_: **[DELETE]**

#### Response

##### 200 (ok)

###### Example response

```
{
  "message": "Article has been nuked"
}
```

##### 400 (Bad Request)

Invalid article ID

```
{
  "message": "couldn't find article by that id"
}
```

All fields (name, url, pusblisher, description) are still required (none can be blank).

##### 500 (Bad Request)

```
  {
    message: "something went wrong",
  }
```
