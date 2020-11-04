export default function combineRegex(...regexs: RegExp[]): RegExp {
  return new RegExp(regexs.map((regex) => regex.source).join('|'));
}
