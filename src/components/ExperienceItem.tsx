import { For } from 'solid-js';
import { Heading } from '~/components/park-ui/heading';
import { Grid, HStack, Stack } from '~/styled-system/jsx';

import type { Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Box, Center, Circle } from '~/styled-system/jsx';
import ExperienceList from './ExperienceList';
import { Badge } from './park-ui/badge';
import { Icon } from './park-ui/icon';
import { Text } from './park-ui/text';
import { Card } from './park-ui/card';

const ExperienceItem: Component<{
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  techStack?: { icon?: Component; label: string }[];
}> = (props) => {
  return (
    <Grid gridTemplateColumns="20% min-content auto" w="full">
      <Stack textAlign="right">
        <Heading as="h3" size="xs" lineHeight="1.875rem" fontWeight="bold" mt="0.75rem">
          {props.period}
        </Heading>
      </Stack>
      <Stack align="center" gap={0}>
        <Box border="solid 1px" borderColor="border.muted" w="0" h="0.75rem" />
        <Center w="1.5rem" h="1.5rem">
          <Circle bg="fg.muted" size="0.5rem" />
        </Center>
        <Box border="solid 1px" borderColor="border.muted" w="0" h="max" flex={1} />
      </Stack>
      <Card.Root
        pt={3}
        mb={3}
        borderColor="border.muted"
        border="solid"
        borderWidth="1px"
        transition="all 200ms ease-in-out"
        _hover={{ boxShadow: '2xl', transform: 'scale(1.1)', zIndex: 9999 }}
      >
        <Card.Body>
          <Stack>
            <Stack gap={0}>
              <Heading as="h2" size="lg" fontWeight="bold">
                {props.title} @{' '}
                <Text as="span" color="red.9">
                  {props.company}
                </Text>
              </Heading>
              <Heading as="h3" size="sm" color="fg.muted">
                {props.location}
              </Heading>
            </Stack>
            <Stack gap={1}>
              <ExperienceList title="Summary" description={props.description} />
              {/* <ExperienceList title="Achievements" description={props.description} />
          <ExperienceList title="Responsibilities" description={props.description} /> */}
            </Stack>
            <HStack>
              {
                <For each={props.techStack}>
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
          </Stack>
        </Card.Body>
      </Card.Root>
    </Grid>
  );
};

export default ExperienceItem;
