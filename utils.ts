export function normalizeString(input: string): string {
  // replace white spaces and any other character that are not a letter or a number by a dash
  const output = input.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  // replace multiple dashes by one dash and remove dashes at the beginning and at the end
  return output.replace(/-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
} 