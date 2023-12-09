import {ItemLessonProps} from "@screens/LessonMap/components";

export const defaultCheckPointLessonData: ItemLessonProps = {
  id: Math.floor(Math.random() * 1000000000000).toString(),
  lessonTitle: "Check point Introduce",
  lessonDescription: "Test your skills to access the next chapter",
  type: "checkpoint",
  status: "current",
  chapterStatus: "unlock",
  thumbnail: "",
  nextLessonId: ''
}
