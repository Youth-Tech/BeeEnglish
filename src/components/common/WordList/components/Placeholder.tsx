import React from 'react'
import { Block } from '@components/bases'
import { makeStyles } from '@themes'

const Placeholder = (offset: Offset) => {
  const styles = useStyle(offset)
  return <Block style={styles.placeholderStyle} />
}

export default Placeholder

const useStyle = makeStyles<Offset>()(({}) => ({
  placeholderStyle: (offset) => ({
    borderRadius: 15,
    position: 'absolute',
    width: offset.width.value,
    top: offset.originalY.value,
    left: offset.originalX.value,
    transform: [{ translateY: -3 }], //shadow block height
    backgroundColor: '#E5E5E5',
    height: offset.height.value + 3 - 12, //shadow block height
  }),
}))
