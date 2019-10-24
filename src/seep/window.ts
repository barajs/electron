import { WindowProps } from '../flow'

export const winNameEq = (name: string) => (payload: WindowProps) =>
  payload.win.__metadata.name === name || false
