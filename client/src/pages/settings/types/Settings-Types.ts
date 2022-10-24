export type ActivateType = (email: string, id: number) => Promise<string>
export type CancelActivation = (id: number) => void