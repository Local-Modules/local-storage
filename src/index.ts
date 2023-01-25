import LocalStorage from './LocalStorage'
import MemoryStorage from './MemoryStorage'

export const memoryStorage = new MemoryStorage()
export default new LocalStorage()
