import React from 'react'
import { Icon } from '@assets'
import { useTheme } from '@themes'
import { navigate } from '@navigation'
import { Task } from '@services/TaskService'
import { Block, Progress, ShadowBlock, Text } from '@components'

export interface TaskItemProps {
  data: Task
}
export const TaskItem: React.FC<TaskItemProps> = (props) => {
  const { data } = props
  const { normalize, colors } = useTheme()

  const renderIcon = () => {
    switch (data.type) {
      case 'learn':
        return <Icon state={'LearnBook'} />
      case 'read':
        return <Icon state={'LearnBook'} />
      case 'time':
        return <Icon state={'Clock'} />

      default:
        return <Icon state={'LearnBook'} />
    }
  }
  const handleRedirect = () => {
    switch (data.type) {
      case 'learn': {
        if (data.target) {
          navigate('DETAIL_LESSON_SCREEN', {
            lessonId: data.target,
            chapterId: data.chapter,
          })
        }
        break
      }
      case 'time': {
        navigate('LEARNING_SCREEN')
        break
      }
      case 'read': {
        navigate('MORE_POST_SCREEN')
        break
      }
    }
  }
  return (
    <ShadowBlock
      row
      height={55}
      alignCenter
      paddingLeft={15}
      space={'between'}
      paddingRight={11}
    >
      <Block flex row alignCenter>
        {renderIcon()}
        <Block marginLeft={13}>
          <Text size={'h5'} fontFamily={'bold'} center>
            {data.title}
          </Text>
          <Block row alignCenter gap={7} marginTop={3}>
            <Progress
              step={data.progress}
              totalSteps={100}
              progressContainerStyles={{ width: normalize.h(137) }}
            />
            <Block row justifyCenter alignCenter>
              <Text
                size={'h5'}
                lineHeight={18}
                color={colors.blue}
                fontFamily={'semiBold'}
              >
                x{data.score}
              </Text>
              <Icon state={'Honey'} />
            </Block>
          </Block>
        </Block>
      </Block>
      <Icon state={'GoButton'} onPress={handleRedirect} />
    </ShadowBlock>
  )
}
