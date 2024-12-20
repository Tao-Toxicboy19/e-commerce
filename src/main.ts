import express from 'express'
import connectDB from './infrastructure/database/mongodb'
import * as dotenv from 'dotenv'
import Redis from 'ioredis'
import session from 'express-session'
import RedisStore from 'connect-redis'
import userRoutes from './application/routes/UserRoute'
import addressRoute from './application/routes/AddressRoute'
import productRoute from './application/routes/ProductRoute'
import shopRoute from './application/routes/ShopRoute'
import cartRoute from './application/routes/CartRoute'
import categoriesRoute from './application/routes/CategoriesRoute'
import cors from 'cors'

dotenv.config()

const app = express()

const port = 3000
connectDB()

const redisClient = new Redis({
    host: process.env.REDIS_HOST, // ตั้งค่า host ของ Redis
    port: Number(process.env.REDIS_PORT), // ตั้งค่า port ของ Redis
})

app.use(
    cors({
        origin: true,
        credentials: true, 
    })
)
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
            maxAge: 1000 * 60 * 15, // 15 นาที
        },
    })
)

app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', addressRoute)
app.use('/api', productRoute)
app.use('/api', shopRoute)
app.use('/api', cartRoute)
app.use('/api', categoriesRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
