import './styles/typography.css';

import { useId } from 'react';

import Markdown from 'react-markdown';

import { Layout } from './components/Layout';
import { Article, Code, Img } from './components/mdx';

export default function Component() {
  const id = useId();

  const data =
    '# Hello, world!\n\nThis is a simple markdown file that is rendered using `react-markdown` and `@releasehub/web` components.';

  return (
    <div>
      <Layout>
        <Article id={id} date={new Date()}>
          <Markdown
            components={{
              code: Code,
              img: Img as any,
            }}
          >
            {data}
          </Markdown>
        </Article>
      </Layout>
    </div>
  );
}
