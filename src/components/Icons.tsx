import React from 'react'
import type { PropsWithChildren } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'

type IconProps = PropsWithChildren<{
  name: string
}>

const Icons = ({name} : IconProps) => {
    switch (name) {
    case 'circle':
      return <Icon name="circle" size={38} color="#F7CD2E" />
      break
    case 'cross':
      return <Icon name="times" size={38} color="#38CC77" />
      break

      default:
    }
}

export default Icons