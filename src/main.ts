import express from 'express'
import userRoutes from './application/routes/UserRoute'
import connectDB from './infrastructure/database/mongodb'
import * as dotenv from 'dotenv'
import Redis from 'ioredis'
import session from 'express-session'
import RedisStore from 'connect-redis'

dotenv.config()

const app = express()

const port = 3000
connectDB()

const redisClient = new Redis({
    host: '127.0.0.1', // ตั้งค่า host ของ Redis
    port: 6379, // ตั้งค่า port ของ Redis
})

// การตั้งค่า session middleware
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // secure: true สำหรับ production ที่ใช้ https
        },
    })
)
app.use(express.json())
app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
