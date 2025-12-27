import type { Media, RichTextBlock } from '@/payload-types'
import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'
import ImageKitImage from '@/components/imagekit-image'
import { cn } from '@/lib/utils'

type Props = Pick<RichTextBlock, 'content'> & {
  className?: string
}

export default function Prose({ content, className }: Props) {
  if (!content) return null

  return (
    <RichText
      converters={{
        ...defaultJSXConverters,
        upload: ({ node }) => {
          return <ImageKitImage image={node.value as Media} width={900} height={500} />
        },
      }}
      data={content}
      className={cn('prose', className)}
    />
  )
}
