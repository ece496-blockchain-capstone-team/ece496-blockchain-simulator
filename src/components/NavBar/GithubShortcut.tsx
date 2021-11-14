import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaGithub as GithubIcon } from 'react-icons/fa';

const githubRepo =
  'https://github.com/ece496-blockchain-capstone-team/ece496-blockchain-simulator';

export default function GithubShortcut() {
  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={() => window.open(githubRepo)}
      icon={<GithubIcon />}
      aria-label={`Go to Github Repository`}
    />
  );
}
