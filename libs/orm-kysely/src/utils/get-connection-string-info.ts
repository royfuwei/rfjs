import { parse } from 'pg-connection-string';
import { getOptionsSchemas } from './get-options-schemas';

function hasSearchPathInOptions(options?: string) {
  return !!options && options.includes('search_path');
}

function appendSearchPathOption(options: string | undefined, schema: string) {
  const opt = (options ?? '').trim();

  if (hasSearchPathInOptions(opt)) return opt;

  const add = `-csearch_path=${schema}`;

  return opt ? `${opt} ${add}` : add;
}

export function getConnectionStringInfo(
  connectionString: string,
  targetSchema?: string,
): {
  finalConnectionString: string;
  finalSchema: string;
  optionsSchemas: string[];
  hasSearchPath: boolean;
} {
  const config = parse(connectionString);

  const hasSearchPath = hasSearchPathInOptions(config.options);
  const optionsSchemas =
    hasSearchPath && config.options ? getOptionsSchemas(config.options) : [];

  const finalSchema = optionsSchemas[0] || targetSchema || 'public';

  // 用 URL 物件去改 query param（options=...）
  const url = new URL(connectionString);

  if (!hasSearchPath && targetSchema) {
    // 合併既有的 options query param（若有）
    const existingOptions =
      url.searchParams.get('options') ?? config.options ?? undefined;
    const merged = appendSearchPathOption(existingOptions, targetSchema);

    url.searchParams.set('options', merged);
  }

  return {
    optionsSchemas,
    finalSchema,
    finalConnectionString: url.toString(),
    hasSearchPath,
  };
}
