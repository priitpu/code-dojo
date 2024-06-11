export interface HOptions {
  attr?: Record<string, string>;
}

/**
 * Create an HTML element.
 * @param tag Tag name
 * @param classList Class list
 * @param children Children to add, or inner HTML text
 * @param opts More options
 * @returns HTML element
 */
export const h = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  classList?: string[],
  children?: HTMLElement[] | string,
  opts?: HOptions
) => {
  const element = document.createElement(tag as string);

  if (classList?.length) {
    element.classList.add(...classList);
  }

  if (opts?.attr) {
    Object.entries(opts.attr).forEach(([attr, val]) =>
      element.setAttribute(attr, val)
    );
  }

  if (children?.length) {
    if (Array.isArray(children)) {
      Object.values(children).forEach((child) => element.appendChild(child));
    } else {
      element.innerHTML = children;
    }
  }

  return element as HTMLElementTagNameMap[K];
};
