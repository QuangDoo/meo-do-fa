export default function combineRegex(...regexs: RegExp[]): RegExpMatchArray {
  return new RegExp(regexs.map((regex) => regex.source).join('|'));
}
