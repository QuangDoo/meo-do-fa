export default function toNumbersOnly(string: string) {
  return +string.replace(/\D/g, '');
}
