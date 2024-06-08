# Lost and found server
## this appliaction is for found lost material and claim losted material which were founded by someone.



# installation and setup

1. Clone this repository ```
    git clone <repositroy_url>
```

2. Install Dependencies : ```
    npm install
```

3. Set up the environment variables by creating a ```
    .env
``` 

4. Run the database migrations ```
npx prisma migrate dev
```

5. Start the server: ```
 npm run start:dev
``` 
---------------------------------

api = https://assign-9-five.vercel.app/api

# User
## Register -- POST

${api}/register


## Login --POST
${api}/login 

## profile --GET -- Authorization = accessToken should provide
${api}/login 

## update profile --PUT -- Authorization = accessToken should provide
${api}/update 

## change password --PUT -- Authorization = accessToken should provide
${api}/change-password

## Users --GET -- Authorization = accessToken should provide
${api}/users

## User --GET -- Authorization = accessToken should provide
${api}/user/userId

## Deactive --PUT -- Authorization = accessToken should provide --Only Admin

${api}/deactive/userId



# Category 

## Create Category --POST - Authorization = accessToken should provide

${api}/found-item-categories

##  Categories --GET - Authorization = accessToken should provide

${api}/found-item-categories


# Found Items
## Create Found Itens --POST - Authorization = accessToken should provide
${api}/found-items

## All Found Itens --GET - Authorization = accessToken should provide
${api}/found-items

# Lost Items
## Create Lost Items --POST Authorization = accessToken should provide
${api}/lost-item/create

## All lost items --GET Authorization = accessToken should provide
${api}/lost-items


# Claims 
## create Claim --POST Authorization = accessToken should provide
${api}/claims

## all Claim --GET Authorization = accessToken should provide
${api}/claims

## my Claim --GET Authorization = accessToken should provide
${api}/me/claims

