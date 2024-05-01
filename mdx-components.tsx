import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => (
      <h1
        className="leading-10 text-white/100"
        style={{ fontSize: 36 }}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="leading-10 text-white/80"
        style={{ fontSize: 28 }}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="leading-10 text-white/80"
        style={{ fontSize: 20 }}
        {...props}
      />
    ),
    p: (props) => (
      <p className="text-lg leading-7 text-white/50 lg:text-xl" {...props} />
    ),
    a: (props) => <a className="text-white/70" {...props} />,
  };
}
