import { Heading } from '~/components/park-ui/heading';
import { Stack, styled } from '~/styled-system/jsx';

import { Text } from './park-ui/text';

const ExperienceList = (props: { title: string; description: string }) => {
  return (
    <Stack gap={1}>
      <Heading as="h3" size="sm" fontWeight="bold">
        {props.title}:
      </Heading>
      <styled.ul
        listStyleType="disc"
        paddingInlineStart="1rem" // This got reset in Panda CSS reset layer
      >
        <Text
          as="li"
          _marker={{
            color: 'red.9',
          }}
          size="sm"
          color="neutral.11"
        >
          {props.description}
        </Text>
      </styled.ul>
    </Stack>
  );
};

export default ExperienceList;
