export * from './PokemonService'
export * from './TokenService'
export * from './KnowledgeService'

export interface DefaultResponse {
  message: string
  code?: number
  subMessage?: string
}
