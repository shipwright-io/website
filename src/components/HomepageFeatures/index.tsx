import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Builds Made Simple',
    Svg: require('@site/static/img/builds-made-simple.svg').default,
    description: (
      <>
        Tell Shipwright where your source code is and where to publish the container image. It takes care of the rest!
      </>
    ),
  },
  {
    title: 'Choice of Tools',
    Svg: require('@site/static/img/choice-of-tools.svg').default,
    description: (
      <>
        Shipwright lets you pick from a wide variety of tools to build your images.
        Bring your own build tools with the <code>BuildStrategy</code> API.
      </>
    ),
  },
  {
    title: 'Security and Scalability',
    Svg: require('@site/static/img/security-and-scalability.svg').default,
    description: (
      <>
        Shipwright is powered by <a href="https://kubernetes.io">Kubernetes</a> and <a href="https://tekton.dev">Tekton</a>,
        allowing your teams to run secure builds at scale.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
