/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SERVER_URL: string
    PAYLOAD_SECRET: string
    DATABASE_URI: string
    DATABASE_NAME: string
    DATABASE_APP_NAME: string
    IMAGEKIT_PRIVATE_KEY: string
    IMAGEKIT_FOLDER: string
  }
}
