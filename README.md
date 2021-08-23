# <p align="center">African Marketplace API</p>

## <p align="center">https://ft-african-marketplace-05-back.herokuapp.com/</p>
| AUTH | URL                | Requires                                  | Restrictions | Returns                                                 |
|------|--------------------|-------------------------------------------|--------------|---------------------------------------------------------|
| POST | /api/auth/register | -username<br>-password<br>-phone number | None         | Newly created user with <br>auto-generated userId       |
| POST | /api/auth/login    | -username<br>-password                    | None         | Logged in user data and <br>JWT token for authorization |

---
# User End-Points
| Users  | URL                       | Requires                                                                        | Restrictions | Returns                                               |
|--------|---------------------------|---------------------------------------------------------------------------------|--------------|-------------------------------------------------------|
| GET    | /api/users/               | N/A                                                                             | -Valid Token | Object Array of all Users |
| GET    | /api/users/:user_id            | N/A                                                                             | -Valid Token | Individual user object                                |
| PUT    | /api/users/:user_id            | -Any of the<br><br>keys (ex. username)                                          | -Valid Token | Single object of updated user's<br>data               |
| DELETE | /api/users/:user_id            | N/A                                                                             | -Valid Token | Deleted user    |

---
# Item End-Points
| Items | URL                          | Requires                                                                                                         | Restrictions                                                                          | Returns                                                         |
|---------|------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| GET     | /api/items/                | N/A                                                                                                              | -Valid Token                                                                          | Object Array of all Items                                     |
| GET     | /api/items/:item_id             | N/A                                                                                                              | -Valid Token                                                                          | Individual item                                         |
| POST    | /api/items/                | -name<br>-description<br>-price<br>-location| -Valid Token<br>-Can only be used<br>when currently<br>logged in  | Single object of newly created<br>item                        |
| PUT     | /api/items/:item_id             | -Appropriate keys <br>with changed values                                                                        | -Valid Token<br>-Can only be used<br>when currently<br>logged in  | Single object of updated item                         |
| DELETE  | /api/items/:item_id             | N/A                                                                                                              | -Valid Token<br>-Can only be used<br>when currently <br>logged in | The deleted item                                               |
