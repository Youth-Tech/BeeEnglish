export * from './UserService'
export * from './MediaService'
export * from './TokenService'
export * from './PokemonService'
export * from './KnowledgeService'

export interface DefaultResponse {
  message: string
  code?: number
  subMessage?: string
}
