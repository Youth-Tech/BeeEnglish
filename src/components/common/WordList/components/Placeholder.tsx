import React from 'react'
import { Block } from '@components/bases'
import { Offset } from '..'
import { makeStyles } from '@themes'

const Placeholder = (offset: Offset) => {
  const styles = useStyle(offset)
  return <Block style={styles.placeholderStyle} />
}

export default Placeholder

const useStyle = makeStyles<Offset>()(({ colors }) => ({
  placeholderStyle: (offset) => ({
    borderRadius: 15,
    position: 'absolute',
    width: offset.width.value,
    top: offset.originalY.value,
    left: offset.originalX.value,
    transform: [{ translateY: -3 }], //shadow block height
    backgroundColor: colors.greyLight,
    height: offset.height.value + 3 - 10, //shadow block height
  }),
}))
