import Redis from "ioredis";

// ตั้งค่า Redis client
export const redisClient = new Redis({
    host: 'localhost', // ที่อยู่ของ Redis server
    port: 6379, // พอร์ตที่ Redis ใช้
})
