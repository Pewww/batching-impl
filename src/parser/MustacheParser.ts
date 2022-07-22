import type { ViewModelSource } from '../ViewModel';

export const MUSTACHE_REGEX = /{{\s?([^}]*)\s?}}/g;
export const MUSTACHE_INNER_VALUE_REGEX = /[^{\{]+(?=}\})/g;

export default class MustacheParser {
  public static parse(
    _data: ViewModelSource['data'],
    textContent: string
  ) {
    const parsedTextContent = textContent.replace(MUSTACHE_REGEX, val => {
      const [expression] = val.match(MUSTACHE_INNER_VALUE_REGEX);
      // 온전한 파싱 기능을 제공하지 않음
      const executedExpression = eval(`_data.${expression.trim()}`);

      return executedExpression;
    });

    return parsedTextContent;
  }
}
