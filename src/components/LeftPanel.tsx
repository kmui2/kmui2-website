import { Heading } from '~/components/park-ui/heading';
import { Text } from '~/components/park-ui/text';
import { Box, HStack, LinkOverlay, Stack, styled } from '~/styled-system/jsx';

import { GlobeIcon, MailIcon, MoonIcon, PhoneIcon } from 'lucide-solid';
import { createSignal, Show, type Component } from 'solid-js';
import avatarImage from '~/assets/avatar.jpg';
import { Link } from '~/components/park-ui/link';
import { css } from '~/styled-system/css';
import { SiGithub, SiLinkedin, SiStackoverflow, SiTwitter } from 'solid-icons/si';
import { Button } from './park-ui/button';
import { IoDocument } from 'solid-icons/io';
import { Spinner } from './park-ui/spinner';

const iconMargin = 1;

const LeftPanel: Component = () => {
  const [isRouting, setIsRouting] = createSignal(false);

  return (
    <Stack align={{ base: 'center', md: 'start' }}>
      <Box p={2} w="max" h="max" border="solid" borderColor="red.9" borderWidth={1}>
        <Box bg="black" p={5} borderRadius="xl">
          <styled.img
            src={avatarImage.src}
            alt="Kevin Mui"
            class={css({ h: '6rem', w: '6rem', clipPath: 'circle(50%)' })}
          />
        </Box>
      </Box>
      <Stack gap={0} align={{ base: 'center', md: 'start' }}>
        <Heading as="h1" size="4xl" fontWeight="bold">
          Kevin Mui
        </Heading>
        <Heading as="h2" size="lg" color="fg.muted">
          Software Engineer / Full Stack Engineer
        </Heading>
      </Stack>
      <Stack gap={0} align={{ base: 'center', md: 'start' }}>
        <HStack gap={2} color="fg.muted" alignItems="center">
          <GlobeIcon size="0.75rem" />
          <Text color="fg.muted" size="sm">
            {' '}
            Chicago, IL
          </Text>
        </HStack>
        <Link href="mailto:kevinmui1997@yahoo.com">
          <HStack gap={2} color="fg.muted" alignItems="center">
            <MailIcon size="0.75rem" />
            <Text size="sm" color="fg.muted">
              kevinmui1997@yahoo.com
            </Text>
          </HStack>
        </Link>
      </Stack>
      <HStack color="red.9">
        <MailIcon size="1.25rem" class={css({ m: iconMargin })} />
        <PhoneIcon size="1.25rem" class={css({ m: iconMargin })} />
        <SiLinkedin size="1.25rem" class={css({ m: iconMargin })} />
        <SiTwitter size="1.25rem" class={css({ m: iconMargin })} />
        <SiGithub size="1.25rem" class={css({ m: iconMargin })} />
        <SiStackoverflow size="1.25rem" class={css({ m: iconMargin })} />
      </HStack>
      <Heading as="h1" size="4xl" fontWeight="bold">
        About
      </Heading>
      <Text size="sm" color="neutral.11" textAlign={{ base: 'center', md: 'start' }}>
        As a seasoned Software Engineer with 8 years of senior level experience, specializing in
        fintech, Java backend, and React frontend development, I have a proven track record of
        designing and implementing high-volume risk management applications. During my tenure at CME
        Group for over 5 years, I honed my skills in developing cutting-edge solutions on Google
        Cloud Platform (GCP). I bring a unique blend of technical expertise and industry-specific
        knowledge that enables me to drive innovation and deliver exceptional results.
      </Text>

      <HStack alignItems="center">
        <MoonIcon />
        <Text>Dark</Text>
      </HStack>
      <Box>
        <Button variant="outline" onClick={() => setIsRouting(true)}>
          <Show when={!isRouting()} fallback={<Spinner />}>
            <IoDocument />
          </Show>
          <LinkOverlay
            //  href="/resume.pdf"
            href="/resume"
          >
            Resume
          </LinkOverlay>
        </Button>
      </Box>
    </Stack>
  );
};

export default LeftPanel;
