import { MediaType } from "./media-type"

export type ModuleType = {
  id: number
  name: string
  objective: string
  medias: Array<MediaType> // ModuleType[]
}
