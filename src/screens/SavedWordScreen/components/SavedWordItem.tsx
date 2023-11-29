import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { normalize, useTheme } from '@themes'
import { Block, ShadowButton, Text } from '@components'
import { Word } from '@services'

export interface SavedWordItemProps {
  data: Word
  onPress?: () => void
  onDeletePress?: () => void
}

export const SavedWordItem: React.FC<SavedWordItemProps> = ({
  data,
  onPress,
  onDeletePress,
}) => {
  const { colors } = useTheme()

  const isSenseEmpty = Object.keys(data.senses[0]).length === 0
  return (
    <Pressable onPress={onPress}>
      <Block
        row
        alignCenter
        paddingLeft={30}
        paddingRight={10}
        paddingVertical={12}
      >
        <Block style={styles.wordContainer}>
          <Block row alignCenter>
            <Text size={'h4'} fontFamily="semiBold">
              {data.english}
            </Text>
            <Text
              size={'h5'}
              fontFamily="regular"
              marginLeft={4}
              color={colors.greyDark}
            >
              ({isSenseEmpty ? '' : data.senses[0].type})
            </Text>
          </Block>
          <Text size={'h5'} fontFamily="regular" color={colors.greyDark}>
            /{data.pronunciation}/
          </Text>
        </Block>

        <ShadowButton
          buttonWidth={30}
          buttonHeight={26}
          buttonRadius={10}
          buttonColor="red"
          buttonBorderSize={0.5}
          shadowButtonColor={colors.redThick}
          onPress={onDeletePress}
        >
          <Text fontFamily="bold" size={'h3'} color="white">
            X
          </Text>
        </ShadowButton>
      </Block>
      <Block backgroundColor={colors.greyLight} height={1} width="100%" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wordContainer: {
    gap: normalize.v(6),
  },
})
