import { HStack } from '~/styled-system/jsx';

import { For, type Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import Section from './Section';
import { Badge } from './park-ui/badge';
import { Icon } from './park-ui/icon';
import {
  SiApachecassandra,
  SiApachekafka,
  SiFlutter,
  SiGooglecloud,
  SiJavascript,
  SiOracle,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpring,
  SiTypescript,
} from 'solid-icons/si';
import { FaBrandsJava } from 'solid-icons/fa';

const techStack: { icon?: Component; label: string }[] = [
  { label: 'Java', icon: FaBrandsJava },
  { label: 'Spring', icon: SiSpring },
  { label: 'React', icon: SiReact },
  { label: 'JavaScript', icon: SiJavascript },
  { label: 'TypeScript', icon: SiTypescript },
  { label: 'GCP', icon: SiGooglecloud },
  { label: 'Oracle', icon: SiOracle },
  { label: 'Cassandra', icon: SiApachecassandra },
  { label: 'Kafka', icon: SiApachekafka },
  { label: 'Python', icon: SiPython },
  { label: 'Postgres', icon: SiPostgresql },
  { label: 'Flutter', icon: SiFlutter },
];

const Skills: Component = () => {
  return (
    <Section heading="Skills">
      <HStack flexWrap="wrap">
        {
          <For each={techStack}>
            {({ icon, label }) => (
              <Badge bg="red.4" color="red.9" size="sm">
                {icon && (
                  <Icon
                    h="1rem"
                    color="red.9"
                    asChild={(props) => <Dynamic component={icon} {...props()} />}
                  />
                )}{' '}
                {label}
              </Badge>
            )}
          </For>
        }
      </HStack>
    </Section>
  );
};

export default Skills;
