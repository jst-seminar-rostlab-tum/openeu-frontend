import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

interface StreamingMarkdownProps {
  content: string;
  className?: string;
  isStreaming?: boolean;
}

export function StreamingMarkdown({
  content,
  className = '',
  isStreaming = false,
}: StreamingMarkdownProps) {
  if (isStreaming) {
    return (
      <pre
        className={cn(
          'whitespace-pre-wrap text-sm leading-relaxed break-words overflow-wrap-anywhere font-sans',
          className,
        )}
      >
        {content}
      </pre>
    );
  }

  return (
    <div className={cn('text-sm', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          p: ({ children }) => (
            <p className="whitespace-pre-wrap leading-relaxed break-words overflow-wrap-anywhere mb-2 last:mb-0">
              {children}
            </p>
          ),
          h1: ({ children }) => (
            <h1 className=" font-bold mt-4 mb-2 first:mt-0 text-xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className=" font-semibold mt-3 mb-2 first:mt-0 text-lg">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className=" font-semibold mt-3 mb-1 first:mt-0 text-md">
              {children}
            </h3>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-muted px-1 py-0.5 rounded  font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-muted p-3 rounded  font-mono overflow-x-auto">
                {children}
              </code>
            );
          },
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
          ),
          ol: ({ children, start }) => (
            <ol
              className="mb-2 space-y-1 font-medium"
              style={{
                listStyleType: 'decimal',
                paddingLeft: '1rem',
              }}
              start={start}
            >
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-muted-foreground/20 pl-4 italic my-2">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-2">
              <table className="border-collapse border border-border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-2 py-1 bg-muted font-semibold text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-2 py-1">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
