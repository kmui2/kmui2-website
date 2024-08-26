import type { Component } from 'solid-js';
import { Box } from '~/styled-system/jsx';
import { Text } from './park-ui/text';

const Header: Component = () => {
  return (
    <Box>
      <Text as="h1">Hello, world!</Text>
    </Box>
  );
};

export default Header;
