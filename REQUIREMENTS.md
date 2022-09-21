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

`GET` // http://localhost:3000/allusers [token required]

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

`GET` // http://localhost:3000/getuserByid/:id [token required]

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

`POST` // http://localhost:3000/createproduct [token required]

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

`GET` // http://localhost:3000/allproducts [token required]

```
    Response Body:	{

"name" : String,
"price": String,
"seller":String

}
```

### GET Product BY Name

`GET` // http://localhost:3000/getproductByname/:name [token required]

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

`PATSH` // http://localhost:3000/updateproduct [token required]

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

`POST` // http://localhost:3000/createOrder [token required]

```
Request Data: {

"users_id": Number,
"status": String,
		}

Response Body: {
	"status": "success",
	"message": "create data",
	"data": {
	"users_id": Number,
	"status": String,
	}
}
```

### Get All Orders

`GET` // http://localhost:3000/allorders [token required]

```
Response Body: {
"status": "success",
"message": "create data",
"data": {
"users_id": Number,
"status": String,
}
}
```

### Get Order By ID Useing ShowByid

`GET` // http://localhost:3000/getorderByid/:id [token required]

```
Request : (Required Authorization Header)

Response Body: {
"status": "success",
"message": "create data",
"data": {
"users_id": Number,
"status": String,
}
}
```

### Update Orders By ID

`PATSH` // http://localhost:3000/updateorder [token required]

```
Request Data: {
"users_id": Number,
"status": String,
}

Response Body: {
"status": "success",
"message": "create data",
"data": {
"users_id": Number,
"status": String,
}
}
```

### Delete Orders By ID

`GET` // http://localhost:3000/deleteorderByid/:id

```
Response Body: {
"status": "success",
"message": "create data",
"data": {
"users_id": Number,
"status": String,
}
}
```

## Orders_products

`POST` // create product http://localhost:3000/createOrdersProducts [token required]

```
Request Data: {
order_id : Number,
quantity: 	Number,
product_id:Number
	}
Response Body: {
"status": "success",
"message": "create data",
"data": {
order_id : Number,
quantity: 	Number,
product_id:Number
	}
}
```

### get all data from Orders-Products TABLE

GET // http://localhost:3000/allproducts [token required]

```
Response Body: {
"status": "success",
"message": "create data",
"data": {
order_id : Number,
quantity: 	Number,
product_id:Number
}}
```

### GEt Data By ID

GET // http://localhost:3000/getOrdersProducts/:id [token required]

```
Response Body: {
"status": "success",
"message": "create data",
"data": {
order_id : Number,
quantity: 	Number,
product_id:Number
}
}
```

### Update BY id

`PATSH` // http://localhost:3000/updateOrdersProducts [token required]

```
Request Data: {
order_id : Number,
quantity: 	Number,
product_id:Number
}

Response Body: {
"status": "success",
"message": "create data",
"data": {
order_id : Number,
quantity: 	Number,
product_id:Number
}
}
```

### Delete By ID

`GET` // http://localhost:3000/deleteOrdersProductsByid/:id

```
Response Body: {
"status": "success",
"message": "create data",
"data": {
order_id : Number,
quantity: 	Number,
product_id:Number
}
}
```

# Database Schema

## users

```
                                      Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 user_name  | character varying(50)  |           | not null |
 first_name | character varying(50)  |           | not null |
 last_name  | character varying(50)  |           | not null |
 password   | character varying(255) |           | not null |
 email      | character varying(255) |           |          |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_users_id_fkey" FOREIGN KEY (users_id) REFERENCES users(id)
```

## products

```
                                     Table "public.products"
  Column   |         Type          | Collation | Nullable |                   Default
------------+-----------------------+-----------+----------+----------------------------------------------
 product_id | integer               |           | not null | nextval('products_product_id_seq'::regclass)
 name       | character varying(50) |           | not null |
 price      | integer               |           | not null |
 seller     | character varying(50) |           | not null |
Indexes:
    "products_pkey" PRIMARY KEY, btree (product_id)
Referenced by:
    TABLE "orders_products" CONSTRAINT "orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(product_id)
```

## orders

```
                                    Table "public.orders"
  Column  |          Type          | Collation | Nullable |              Default
----------+------------------------+-----------+----------+------------------------------------
 id       | integer                |           | not null | nextval('orders_id_seq'::regclass)
 status   | character varying(100) |           | not null |
 users_id | integer                |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_users_id_fkey" FOREIGN KEY (users_id) REFERENCES users(id)
Referenced by:
    TABLE "orders_products" CONSTRAINT "orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
```

## orders_products

```
                              Table "public.orders_products"
   Column   |  Type   | Collation | Nullable |                   Default
------------+---------+-----------+----------+---------------------------------------------
 id         | integer |           | not null | nextval('orders_products_id_seq'::regclass)
 quantity   | integer |           |          |
 product_id | integer |           |          |
 order_id   | integer |           |          |
Indexes:
    "orders_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(product_id)
```
