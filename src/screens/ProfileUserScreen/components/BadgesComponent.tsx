import { Block, Image, Progress, Text } from '@components'
import React from 'react'
import { useStyles } from './styles'
import { useTheme } from '@themes'

const BadgesComponent: React.FC<Badges> = ({ attachments, desc, name }) => {
  const styles = useStyles()
  const { colors } = useTheme()
  return (
    <Block row style={styles.boxItemStatistical}>
      <Image
        source={{ uri: `${attachments.src}` }}
        width={80}
        resizeMode="contain"
        style={{
          aspectRatio: 1,
        }}
      />
      <Block style={styles.boxContentBadges}>
        <Block>
          <Text size={'h3'} fontFamily="bold">
            {name}
          </Text>
          <Text size={'h5'}>{desc}</Text>
        </Block>
        <Block row>
          <Progress
            strokeHeight={8}
            step={80}
            totalSteps={100}
            progressContainerStyles={{ flexShrink: 1 }}
          />
          <Text
            size={'h5'}
            fontFamily="bold"
            marginLeft={10}
            color={colors.greyDark}
          >
            30/10
          </Text>
        </Block>
      </Block>
    </Block>
  )
}

export default BadgesComponent
