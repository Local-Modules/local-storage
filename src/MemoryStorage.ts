// This class is fallback storage when localStorage is blocked

class MemoryStorage implements Storage {
  private storage = new Map<string, string | null>()

  get length(): number {
    return this.storage.size
  }

  key(index: number): string | null {
    return this.storage.keys()[index] || null
  }

  getItem(key: string): string | null {
    if (this.storage.has(key)) {
      return this.storage.get(key)
    }

    return null
  }

  setItem(key: string, value: string) {
    this.storage.set(key, value)
  }

  removeItem(key: string) {
    this.storage.delete(key)
  }

  clear(): void {
    this.storage.clear()
  }
}


export default MemoryStorage
