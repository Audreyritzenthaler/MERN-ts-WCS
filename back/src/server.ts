import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import cors from 'cors'
import wilderController from './controllers/wilders'
import { isInputError } from './errors/InputError'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect('mongodb://127.0.0.1:27017/wilderdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log('Connected to db !'))
  .catch((err: any) => console.log(err))

app.get('/api/wilder', asyncHandler(wilderController.read))
app.post('/api/wilder', asyncHandler(wilderController.create))
app.put('/api/wilder', asyncHandler(wilderController.update))
app.delete('/api/wilder', asyncHandler(wilderController.delete))

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Wrong address !' })
})

interface MongoError extends Error {
  code: number
}

const isMongoError = (error: Error): error is MongoError => {
  return error.name === 'MongoError'
}

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (isMongoError(error)) {
    switch (error.code) {
      case 11000:
        res.status(400)
        res.json({ success: false, message: 'The name is already used' })
        break
      default:
        res.status(400)
        res.json({ success: false, message: 'An error occured' })
    }
  }
  if (isInputError(error)) {
    res.json({ success: false, message: 'an input error occured', error })
  }
})

app.listen(8080, () => {
  console.log(`Server listening on port 8080`)
})
