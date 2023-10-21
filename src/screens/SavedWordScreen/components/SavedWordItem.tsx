import React from 'react'
import { useTheme } from '@themes'
import { Block, ShadowButton, Text } from '@components'
import { Pressable } from 'react-native'
import { dataSavedWordProps } from '../const'

export interface SavedWordItemProps {
  data: dataSavedWordProps
  onPressBookMark?: () => void
  onPress?: () => void
}

export const SavedWordItem: React.FC<SavedWordItemProps> = ({
  data,
  onPress,
}) => {
  const { colors } = useTheme()
  return (
    <Pressable onPress={onPress}>
      <Block
        row
        backgroundColor={colors.white}
        height={60}
        paddingLeft={35}
        space="between"
        alignCenter
      >
        <Block>
          <Block row alignCenter>
            <Text size={'h4'} fontFamily="semiBold" lineHeight={40}>
              {data.word}
            </Text>
            <Text
              size={'h5'}
              fontFamily="regular"
              marginLeft={4}
              lineHeight={40}
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
          buttonBorderSize={1}
          buttonColor="red"
          shadowButtonColor={colors.redThick}
        >
          <Text fontFamily="bold" size={'h2'} color="white">
            X
          </Text>
        </ShadowButton>
      </Block>
      <Block backgroundColor={colors.greyLight} height={1} width="100%" />
    </Pressable>
  )
}
