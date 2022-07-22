export enum NODE_TYPE {
  ELEMENT_NODE = 1,
  ATTRIBUTE_NODE = 2,
  TEXT_NODE = 3,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9
}

export type InputableElement = HTMLInputElement | HTMLTextAreaElement;

export const checkIsInputable = (tagName: string) => {
  return tagName === 'INPUT' || tagName === 'TEXTAREA';
};
