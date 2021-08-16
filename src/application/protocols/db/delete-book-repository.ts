export interface DeleteBookRepository {
  delete: (id: string) => Promise<void>
}