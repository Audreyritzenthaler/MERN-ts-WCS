import React from 'react'
import blank_profile from '../img/BLOOMER2.png'
import Skill, { SkillProps } from './Skill'
import { Card, List } from './styles/elements'

export type WilderProps = {
  id: string
  city: string
  name: string
  skills: SkillProps[]
}

function Wilder({ city, name, skills }: WilderProps): JSX.Element {
  return (
    <Card>
      <img src={blank_profile} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <h4>{city}</h4>
      <h4>Wild Skills</h4>
      <List>
        {skills.map((skill) => (
          <Skill key={skill.id} {...skill} />
        ))}
      </List>
    </Card>
  )
}

export default Wilder
