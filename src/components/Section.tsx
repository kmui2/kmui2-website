import { Heading } from '~/components/park-ui/heading';
import { Stack } from '~/styled-system/jsx';

import { type ParentComponent } from 'solid-js';

const Section: ParentComponent<{ heading: string }> = (props) => {
  return (
    <Stack gap={5}>
      <Heading as="h1" size="3xl" fontWeight="bold">
        {props.heading}
      </Heading>
      {props.children}
    </Stack>
  );
};

export default Section;
