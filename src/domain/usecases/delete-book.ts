export interface DeleteBook {
  exec: (id: string) => Promise<void>
}