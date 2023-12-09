import { SectionData } from '@screens'
import { Chapter, Lesson } from '@services'
import { ItemLessonProps } from '@screens/LessonMap/components'
import { defaultCheckPointLessonData } from '@screens/LessonMap/mock'

export const parseDataToLessonData = (
  data: Lesson[],
  chapterStatus?: 'lock' | 'unlock',
): ItemLessonProps[] => {
  return data.map((item, index, arr) => {
    const nextLesson = arr[index + 1] || item

    return {
      id: item._id,
      lessonDescription: item.description,
      lessonTitle: item.name,
      status:
        item.status && item.completed
          ? 'completed'
          : item.status
          ? 'current'
          : 'lock',
      thumbnail: item.attachment?.src || '',
      type: 'normal',
      chapterStatus: chapterStatus || 'lock',
      nextLessonId: nextLesson._id,
    }
  })
}

export const parseDataToSectionData = (data: Chapter[]): SectionData[] => {
  return data.map((item) => {
    let lessonComplete = item.lessons.filter((item) => item.status).length
    const data = parseDataToLessonData(
      item.lessons,
      item.status ? 'unlock' : 'lock',
    )

    data.push({
      ...defaultCheckPointLessonData,
      checkpoint: item.checkpoint?.questions ?? [],
      chapterStatus: item.status ? 'unlock' : 'lock',
      status: (item.checkpoint?.score ?? 0) > 80 ? 'completed' : 'current',
    })

    return {
      data,
      lessonComplete,
      index: item.order,
      title: item.name,
      status: item.status ? 'unlock' : 'lock',
      chapterId: item._id,
      checkpoint: item?.checkpoint?.questions || [],
    }
  })
}
