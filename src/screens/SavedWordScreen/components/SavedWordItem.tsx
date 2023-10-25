import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { normalize, useTheme } from '@themes'
import { DataSavedWordProps } from '../const'
import { Block, ShadowButton, Text } from '@components'

export interface SavedWordItemProps {
  data: DataSavedWordProps
  onPress?: () => void
  onDeletePress?: () => void
}

export const SavedWordItem: React.FC<SavedWordItemProps> = ({
  data,
  onPress,
  onDeletePress,
}) => {
  const { colors } = useTheme()
  return (
    <Pressable onPress={onPress}>
      <Block
        row
        alignCenter
        space="between"
        paddingLeft={30}
        paddingRight={10}
        paddingVertical={12}
        backgroundColor={colors.white}
      >
        <Block style={styles.wordContainer}>
          <Block row alignCenter>
            <Text size={'h4'} fontFamily="semiBold">
              {data.word}
            </Text>
            <Text
              size={'h5'}
              fontFamily="regular"
              marginLeft={4}
              color={colors.greyDark}
            >
              ({data.wordType})
            </Text>
          </Block>
          <Text size={'h5'} fontFamily="regular" color={colors.greyDark}>
            /{data.wordPronounce}/
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
