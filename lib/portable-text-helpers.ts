// Helper functions to generate Sanity-compatible Portable Text blocks
// These produce the same structure that @portabletext/react expects

let _key = 0
function nextKey(): string {
  return `key${++_key}`
}

export function resetKeys(): void {
  _key = 0
}

interface PortableTextBlock {
  _type: string
  _key: string
  [key: string]: any
}

export function h2(text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: nextKey(),
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: nextKey(), text, marks: [] }],
  }
}

export function h3(text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: nextKey(),
    style: 'h3',
    markDefs: [],
    children: [{ _type: 'span', _key: nextKey(), text, marks: [] }],
  }
}

export function p(text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: nextKey(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: nextKey(), text, marks: [] }],
  }
}

export function bold(text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: nextKey(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: nextKey(), text, marks: ['strong'] }],
  }
}

export function code(language: string, codeStr: string, filename?: string): PortableTextBlock {
  return {
    _type: 'code',
    _key: nextKey(),
    language,
    code: codeStr,
    ...(filename ? { filename } : {}),
  }
}

export function ul(items: string[]): PortableTextBlock[] {
  return items.map((item) => ({
    _type: 'block',
    _key: nextKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: nextKey(), text: item, marks: [] }],
  }))
}

export function ol(items: string[]): PortableTextBlock[] {
  return items.map((item) => ({
    _type: 'block',
    _key: nextKey(),
    style: 'normal',
    listItem: 'number',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: nextKey(), text: item, marks: [] }],
  }))
}

export function blockquote(text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: nextKey(),
    style: 'blockquote',
    markDefs: [],
    children: [{ _type: 'span', _key: nextKey(), text, marks: [] }],
  }
}
