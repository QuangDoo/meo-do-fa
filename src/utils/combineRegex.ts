export default function combineRegex(...regexs: RegExp[]) {
  return new RegExp(regexs.map((regex) => regex.source).join('|'))
}
