// Common encoders/transforms used to adapt payloads to different contexts.
// All run locally in the browser.

function toBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

export interface Encoder {
  id: string;
  name: string;
  apply: (input: string) => string;
}

export const ENCODERS: Encoder[] = [
  {
    id: 'url',
    name: 'URL encode',
    apply: (s) => encodeURIComponent(s),
  },
  {
    id: 'url-all',
    name: 'URL encode (tudo)',
    apply: (s) =>
      [...toBytes(s)].map((b) => `%${b.toString(16).padStart(2, '0').toUpperCase()}`).join(''),
  },
  {
    id: 'double-url',
    name: 'Double URL encode',
    apply: (s) => encodeURIComponent(encodeURIComponent(s)),
  },
  {
    id: 'base64',
    name: 'Base64',
    apply: (s) => btoa(String.fromCharCode(...toBytes(s))),
  },
  {
    id: 'hex',
    name: 'Hex',
    apply: (s) => [...toBytes(s)].map((b) => b.toString(16).padStart(2, '0')).join(''),
  },
  {
    id: 'hex-x',
    name: 'Hex \\x',
    apply: (s) => [...toBytes(s)].map((b) => `\\x${b.toString(16).padStart(2, '0')}`).join(''),
  },
  {
    id: 'unicode',
    name: 'Unicode \\u',
    apply: (s) =>
      [...s].map((c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`).join(''),
  },
  {
    id: 'html',
    name: 'HTML entities',
    apply: (s) =>
      s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`),
  },
];
