// import React, { useEffect, useState } from "react";
import React from 'react'
// import axios from "axios";
import { useQuery, gql } from '@apollo/client'
import './App.css'
import { CardRow, Container, Footer, Header } from './components/styles/elements'
import Wilder, { WilderProps } from './components/Wilder'
import AddWilder from './components/AddWilder'

const ALL_WILDERS = gql`
  query GetAllWilders {
    allWilders {
      id
      name
      city
      skills {
        id
        title
        votes
      }
    }
  }
`

const App = (): JSX.Element => {
  // const [wilders, setWilders] = useState([]);
  const { loading, error, data } = useQuery(ALL_WILDERS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error !</p>

  // useEffect(() => {
  //   const fetchWilders = async () => {
  //     try {
  //       const result = await axios("http://localhost:8080/api/wilders");
  //       setWilders(result.data.result);
  //     } catch (error) {
  //       // console.log(error);
  //     }
  //   };

  //   fetchWilders();
  // }, []);

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
          {data.allWilders.map((wilder: WilderProps) => (
            <Wilder key={wilder.id} id={wilder.id} name={wilder.name} city={wilder.city} skills={wilder.skills} />
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
