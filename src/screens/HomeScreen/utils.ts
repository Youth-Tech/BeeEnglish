import { CurrentLesson } from '@services'
import { LessonProgressItemProps } from '@screens/HomeScreen/components'

export const parsePostData = (
  postData: PostResponse[],
  colors: string[],
): (PostResponse & { textColor: string })[] => {
  const colorValue: Record<string, string> = {}

  postData.forEach((item) => {
    const isInclude = Object.keys(colorValue).includes(item.topic.name)
    if (!isInclude) {
      colorValue[item.topic.name] =
        colors[Math.floor(Math.random() * colors.length)]
    }
  })

  return postData.map((item) => {
    return {
      ...item,
      textColor: colorValue[item.topic.name],
    }
  })
}

export const parseCurrentLesson = (
  currentLesson: Array<CurrentLesson>,
): Array<LessonProgressItemProps> => {
  return currentLesson.map((item, index) => {
    return {
      index,
      lessonId: item.lesson._id,
      lessonLabel: item.lesson.name,
      chapterId: item.lesson.chapter._id,
      topicName: item.lesson.chapter.topic.name,
      topicImage: item.lesson.chapter.topic?.attachment?.src ?? '',
    }
  })
}
