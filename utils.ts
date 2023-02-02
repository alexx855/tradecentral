// remplace white spaces and any other character that are not a letter or a number by a dash
export function normalizeString(input: string): string {
  const output = input.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  return output;
}