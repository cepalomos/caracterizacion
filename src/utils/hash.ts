import bcrypt from 'bcrypt'

export const hash = async (data: string): Promise<string> => {
  const hashData = await bcrypt.hash(data, 8)
  return hashData
}

export const compareHash = async (data: string, dataHash: string): Promise<boolean> => {
  const result = await bcrypt.compare(data, dataHash)
  return result
}
