"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";

import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { urlFor } from "@/lib/sanity";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-white mb-3 mt-5">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold text-white mb-2 mt-4">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-cv-light-gray leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cv-orange pl-4 italic text-cv-light-gray my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-cv-light-gray mb-4 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-cv-light-gray mb-4 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-cv-orange">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cv-orange hover:text-cv-neon underline transition-colors duration-300">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(400).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={400}
            className="rounded-xl w-full h-auto"
          />
          {value.alt && (
            <p className="text-sm text-cv-light-gray text-center mt-2 italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }) => {
      if (!value?.code) {
        return null;
      }

      return (
        <div className="my-6">
          {value.filename && (
            <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg border-b border-gray-700 text-sm font-mono">
              {value.filename}
            </div>
          )}
          <div className="relative">
            <SyntaxHighlighter
              language={value.language || "text"}
              style={tomorrow}
              customStyle={{
                margin: 0,
                borderRadius: value.filename ? "0 0 0.5rem 0.5rem" : "0.5rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
              }}
              showLineNumbers={true}
              wrapLines={true}>
              {value.code}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    },
  },
};

interface PortableTextRendererProps {
  content: any[];
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="prose prose-invert max-w-none">
      <PortableText
        value={content}
        components={components}
      />
    </div>
  );
}
