import { WindowProps } from '../flow'

export const winNameEq = (name: string) => (payload: WindowProps) => {
  console.log(
    `Checking win name ${name} :${JSON.stringify(
      payload.win.__metadata,
      null,
      2,
    )}`,
    payload.win.__metadata.name === name || false,
  )
  return payload.win.__metadata.name === name || false
}
