import type { Media, RichTextBlock } from '@/payload-types'
import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'
import ImageKitImage from '@/components/imagekit-image'
import PageTitle from '../ui/page-title'
import { cn } from '@/lib/utils'
import BlockRenderer from '../block-renderer'

export default function Prose({ intro, title, content, blocks }: RichTextBlock) {
  const hasBlocks = blocks && blocks.length > 0

  if (!title) {
    return (
      <RichText
        converters={{
          ...defaultJSXConverters,
          upload: ({ node }) => {
            return <ImageKitImage image={node.value as Media} width={900} height={500} />
          },
        }}
        data={content}
        className={cn(
          'prose max-w-none prose-headings:font-title prose-headings:font-normal prose-a:text-accent-800 hover:prose-a:text-accent-700 prose-a:no-underline prose-h2:text-4xl prose-h3:text-2xl',
          {
            'md:col-span-2': hasBlocks,
          },
        )}
      />
    )
  }

  return (
    <section className="py-16 md:py-32">
      <PageTitle intro={intro} title={title} level={2} />

      <div
        className={cn('mx-auto px-4', {
          'max-w-5xl': !hasBlocks,
          'max-w-6xl grid md:grid-cols-5 gap-16 lg:gap-32': hasBlocks,
        })}
      >
        <RichText
          converters={{
            ...defaultJSXConverters,
            upload: ({ node }) => {
              return <ImageKitImage image={node.value as Media} width={900} height={500} />
            },
          }}
          data={content}
          className={cn(
            'prose max-w-none prose-headings:font-title prose-headings:font-normal prose-a:text-accent-800 hover:prose-a:text-accent-700 prose-a:no-underline prose-h2:text-4xl prose-h3:text-2xl',
            {
              'md:col-span-2': hasBlocks,
            },
          )}
        />

        {hasBlocks ? (
          <div className="md:col-span-3 place-content-start">
            <BlockRenderer blocks={blocks} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
