import bcrypt from "bcryptjs"

const users = [
  {
    name: 'Adnmin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10)
    },
    {
    name: 'Jene Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10)
    },
]

export default users