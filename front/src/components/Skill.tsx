import React from 'react'
import Proptypes from 'prop-types'
import { Badge } from './styles/elements'

export type SkillProps = {
  id: string
  title: string
  votes: number
}

export type BadgeProps = {
  votes: number
}

const Skill = ({ title, votes }: SkillProps): JSX.Element => {
  return (
    <li>
      {title}
      <Badge votes={votes}>{votes}</Badge>
    </li>
  )
}

Skill.propTypes = {
  title: Proptypes.string.isRequired,
  votes: Proptypes.number.isRequired,
}

export default Skill
