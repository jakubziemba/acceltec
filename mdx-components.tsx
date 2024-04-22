import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => (
      <h1 className="text-4xl leading-10 text-white/80" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-[1.75rem] leading-10 text-white/50" {...props} />
    ),
    p: (props) => <p className="text-xl leading-7 text-white/50" {...props} />,
    a: (props) => <a className="text-white/70" {...props} />,
  };
}
