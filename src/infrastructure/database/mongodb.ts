import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI
        if (!uri) throw new Error()
        await mongoose.connect(uri)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1) // Exit process with failure
    }
}

export default connectDB
