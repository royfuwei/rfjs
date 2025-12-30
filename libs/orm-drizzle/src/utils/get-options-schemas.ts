export function getOptionsSchemas(options: string): string[] {
  if (typeof options !== 'string') return [];

  const m = options.match(/search_path=([^,\s]+)/);
  if (!m) return [];

  return m[1].split(',').map((i) => i.trim());
}
