import 'express-session'

declare module 'express-session' {
    interface SessionData {
        access_token?: string // เพิ่ม property username ลงใน SessionData
        refresh_token?: string // เพิ่ม property username ลงใน SessionData
    }
}
