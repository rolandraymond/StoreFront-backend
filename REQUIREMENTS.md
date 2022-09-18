# STORE-BACKEND information about endpoints

# Users

### Log_in

`POST` // http://localhost:3000/signin

```
Request Data:{"user_name":string , "passsword":string}
 Response :{
	"status": "succes",
  "data": {
    "id": Number,
    "user_name": String,
    "email": String,
    "password": String,
    "first_name": String,
    "last_name": String,
    "token_pass": JWT token
  },
  "message": "user sign in succesfully"
}
```

### user_create

`POST` // http://localhost:3000/createUsers

```
Request Data: { "user_name":srting,
"first_name":srting,
"last_name":srting,
"password":srting
"email":srting }

Response Body:{
  "status": "success",
  "message": "create data",
  "data": {
    "id":        Number,
    "user_name": String,
    "first_name":String,
    "last_name": String,
    "password":  String,
    "email":     String
  }
}
```

### Users_list

`GET` // http://localhost:3000/allusers

```
 Response Body:[{
    "id":        Number,
    "user_name": String,
    "first_name":String,
    "last_name": String,
    "password":  String,
    "email":     String

   }]
```

### Get user User By ID

`GET` // http://localhost:3000/getuserByid/:id

```
	Response Body:{
	"status": "success",
	"message": "its work",
	"data": {
	"id": Number,
	"user_name": String,
	"first_name":String,
	"last_name": String,
	"password": String,
	"email": String
	}
	}
```

### Update User By ID

`PATSH` //http://localhost:3000/updateuser

```
Request Data: {
		"id":  Number
		"user_name":srting,
	"first_name":srting,
	"last_name": srting,
	"password":  srting,
	"email":     srting
		}

Response Body:{
		"status": "success",
		"message": "its work",
		"data": {
		"id": Number,
		"user_name": String,
		"first_name":String,
		"last_name": String,
		"password": String,
		"email": String
		}
		}
```

### Delete user by ID

`GET` // http://localhost:3000/deleteUserByid/:id

```
Response Body:{
status: "success",
data: "user_name",
message: "its work"
}
```

## prodact

### create product

`POST` // http://localhost:3000/createproduct

```
		Request Data:{

		"name":String,
		"price": String,
		"seller":String
		}

	Response Body:	{
  "status": "success",
  "message": "create data",
  "data": {
    "name" : String,
		"price": String,
		"seller":String
  }
}


```

### Get All products

`GET` // http://localhost:3000/allproducts

```
    Response Body:	{

"name" : String,
"price": String,
"seller":String

}
```

### GET Product BY Name

`GET` // http://localhost:3000/getproductByname/:name

```
Response Body: {
"status": "success",
"data": {
"name" : String,
"price": String,
"seller":String
},
"message": "its work "
}
```

### Update Products

`PATSH` // http://localhost:3000/updateproduct

```
Request Data:{

"name":String,
"price": String,
"seller":String,
"product_id":Number
}

Response Body: {
"status": "success",
"data": {
"name" : String,
"price": String,
"seller":String
},
"message": "its work "
}
```

### Delete products By Name

`GET` // http://localhost:3000/deleteproductByname/:name

```
Response Body: {
status: "success",
data: {"name":String},
message: "its work "
}
```

## Orders

### Ceate order

`POST` // http://localhost:3000/createOrder

```
Request Data: {
	time: Sting ,
	users_id : Number,
	quantity: 	Number,
	product_id:Number
		}

Response Body: {
	"status": "success",
	"message": "create data",
	"data": {
		"order_id":   Number,
		"time":       Number,
		"users_id":   Number,
		"quantity":   Number,
		"product_id": Number
	}
}
```

### Get All Orders

`GET` // http://localhost:3000/allorders

```
Response Body: {
"status": "success",
"message": "create data",
"data": {
"order_id": Number,
"time": Number,
"users_id": Number,
"quantity": Number,
"product_id": Number
}
}
```

### Get Order By ID Useing ShowByid

`GET` // http://localhost:3000/getorderByid/:id

```
Response Body: {
"status": "success",
"message": "create data",
"data": {
"order_id": Number,
"time": Number,
"users_id": Number,
"quantity": Number,
"product_id": Number
}
}
```

### Update Orders By ID

`PATSH` // http://localhost:3000/updateorder

```
Request Data: {
time: Sting ,
users_id : Number,
quantity: Number,
product_id:Number
}

Response Body: {
"status": "success",
"message": "create data",
"data": {
"order_id": Number,
"time": Number,
"users_id": Number,
"quantity": Number,
"product_id": Number
}
}
```

### Delet Orders By ID

`GET` // http://localhost:3000/deleteorderByid/:id

```
Response Body: {
"status": "success",
"message": "create data",
"data": {
"order_id": Number,
"time": Number,
"users_id": Number,
"quantity": Number,
"product_id": Number
}
}
```
