type SharedValues<T extends Record<string, string | number | boolean>> = {
  [K in keyof T]: import('react-native-reanimated').SharedValue<T[K]>
}

type Offset = SharedValues<{
  order: number
  width: number
  height: number
  x: number
  y: number
  originalX: number
  originalY: number
}> & {
  value: WordProps
}

interface WordListProps {
  answers: string[]
}

interface WordListRefFunc {
  check: (value: string) => boolean
  onTriggerAnimation: () => void
}

interface WordProps {
  id: string
  word: string
  index?: number
  lines?: number
  offsets?: Offset[]
}
