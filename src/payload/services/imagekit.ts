export type UploadResponse = {
  fileId: string
  name: string
  size: number
  versionInfo: {
    id: string
    name: string
  }
  filePath: string
  url: string
  thumbnailUrl: string
  height: number
  width: number
  fileType: string
  tags?: string[]
  AITags?: Array<{ name: string; confidence: number }>
  isPrivateFile: boolean
  customCoordinates?: string
  customMetadata?: Record<string, any>
}

export type UploadedFile = {
  clientUploadContext?: unknown
  data: Buffer
  mimetype: string
  name: string
  size: number
  tempFilePath?: string
  mv?: (path: string, callback: (err?: Error) => void) => void
  encoding?: string
  truncated?: boolean
  md5?: string
}

export type UploadOptions = {
  file?: Buffer | string
  fileName?: string
  folder?: string
  tags?: string[] | string
  useUniqueFileName?: boolean
  responseFields?: string[] | string
  isPrivateFile?: boolean
  customCoordinates?: string
  extensions?: Array<{ name: string; value: any }> | string
  webhookUrl?: string
  overwriteFile?: boolean
  overwriteAITags?: boolean
  overwriteTags?: boolean
  overwriteCustomMetadata?: boolean
}

class ImageKitService {
  private privateKey: string = ''

  private getAuthHeader(): string {
    return 'Basic ' + Buffer.from(this.privateKey + ':').toString('base64')
  }

  constructor(privateKey: string) {
    this.privateKey = privateKey
  }

  public async upload(file: UploadedFile, options?: UploadOptions): Promise<UploadResponse> {
    const formData = new FormData()

    // Convert Buffer to File for FormData (Node.js 18+ supports File API)
    // Convert Buffer to Uint8Array for compatibility
    const fileData = new Uint8Array(file.data)
    const fileBlob = new File([fileData], file.name, { type: file.mimetype })
    formData.append('file', fileBlob)

    // Add fileName
    const fileName = options?.fileName || file.name
    formData.append('fileName', fileName)

    // Add folder if specified (already converted to string in hook if it was a function)
    if (options?.folder && typeof options.folder === 'string') {
      formData.append('folder', options.folder)
    }

    // Add other upload options
    if (options?.tags) {
      formData.append('tags', Array.isArray(options.tags) ? options.tags.join(',') : options.tags)
    }

    if (options?.useUniqueFileName !== undefined) {
      formData.append('useUniqueFileName', String(options.useUniqueFileName))
    }

    if (options?.responseFields) {
      formData.append(
        'responseFields',
        Array.isArray(options.responseFields)
          ? options.responseFields.join(',')
          : options.responseFields,
      )
    }

    if (options?.isPrivateFile !== undefined) {
      formData.append('isPrivateFile', String(options.isPrivateFile))
    }

    if (options?.extensions) {
      const extensions = Array.isArray(options.extensions)
        ? JSON.stringify(options.extensions)
        : options.extensions
      formData.append('extensions', extensions as string)
    }

    if (options?.overwriteFile !== undefined) {
      formData.append('overwriteFile', String(options.overwriteFile))
    }

    const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(
        `ImageKit upload failed: ${response.status} ${response.statusText} - ${await response.text()}`,
      )
    }

    return response.json()
  }

  async delete(fileId: string): Promise<boolean> {
    const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(
        `ImageKit delete failed: ${response.status} ${response.statusText} - ${await response.text()}`,
      )
    }

    return true
  }
}

export default ImageKitService
