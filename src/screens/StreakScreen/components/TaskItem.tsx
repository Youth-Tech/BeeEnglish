import React from 'react'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { Block, Progress, ShadowBlock, Text } from '@components'
export type TTask = 'learning' | 'money' | 'game'
export interface TaskItemProps {
  taskType: TTask
  taskName: string
  honeyAmount: number
  onPress?: () => void
}
const TaskItem: React.FC<TaskItemProps> = (props) => {
  const { taskType, taskName, honeyAmount, onPress } = props
  const { normalize, colors } = useTheme()

  const renderIcon = () => {
    switch (taskType) {
      case 'learning':
        return <Icon state={'LearnBook'} />
      case 'money':
        return <Icon state={'Money'} />
      case 'game':
        return <Icon state={'Boxing'} />
    }
  }
  return (
    <ShadowBlock
      row
      height={55}
      alignCenter
      paddingLeft={15}
      paddingRight={11}
      space={'between'}
    >
      <Block flex row alignCenter>
        {renderIcon()}
        <Block marginLeft={13}>
          <Text size={'h5'} fontFamily={'bold'}>
            {taskName}
          </Text>
          <Block row alignCenter justifyCenter marginTop={3}>
            <Progress
              step={50}
              totalSteps={100}
              progressContainerStyles={{ width: normalize.h(137) }}
            />
            <Block row justifyCenter alignCenter marginLeft={7}>
              <Text
                size={'h5'}
                lineHeight={18}
                color={colors.blue}
                fontFamily={'semiBold'}
              >
                x{honeyAmount}
              </Text>
              <Icon state={'Honey'} />
            </Block>
          </Block>
        </Block>
      </Block>
      <Icon state={'GoButton'} onPress={onPress} />
    </ShadowBlock>
  )
}
export default TaskItem
