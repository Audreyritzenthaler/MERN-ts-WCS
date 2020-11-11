import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { CardRow, Container, Footer, Header } from './components/styles/elements'
import Wilder, { WilderProps } from './components/Wilder'
import AddWilder from './components/AddWilder'

const App = (): JSX.Element => {
  const [wilders, setWilders] = useState<WilderProps[]>([])

  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const result = await axios('http://localhost:8080/api/wilder')
        setWilders(result.data.result)
      } catch (error) {
        console.log(error)
      }
    }

    fetchWilders()
  }, [])

  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </Header>
      <Container>
        <AddWilder />
      </Container>
      <Container>
        <h2>Wilders</h2>
        <CardRow>
          {wilders.map((wilder) => (
            <Wilder key={wilder._id} {...wilder} />
          ))}
        </CardRow>
      </Container>
      <Footer>
        <Container>
          <p>&copy; 2020 Wild Code School</p>
        </Container>
      </Footer>
    </div>
  )
}

export default App
