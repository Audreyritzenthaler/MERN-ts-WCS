import React, { useState } from 'react'
import { Button, Form, Input, Label } from './styles/form-elements'
import { gql, useMutation } from '@apollo/client'

const CREATE_WILDER = gql`
  mutation CreateWilder($input: InputWilder!) {
    createWilder(input: $input) {
      id
      name
      city
    }
  }
`
const AddWilder = () => {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [createWilder, { data }] = useMutation(CREATE_WILDER)

  return (
    <Form
      onSubmit={async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        createWilder({
          variables: {
            input: {
              name: name,
              city: city,
            },
          },
        })
      }}
    >
      {data && <p>wilder {data.createWilder.name} a été ajouté.e</p>}
      <Label htmlFor="name-input">Name :</Label>
      <Input
        id="name-input"
        type="text"
        placeholder="Type the name"
        value={name}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) => setName(e.target.value)}
      />
      <Label htmlFor="city-input">City :</Label>
      <Input
        id="city-input"
        type="text"
        placeholder="Type the city"
        value={city}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) => setCity(e.target.value)}
      />
      <Button>Add</Button>
    </Form>
  )
}

export default AddWilder
