import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Button, Link } from '@chakra-ui/react';

interface LinkItemProps {
  to: string;
  children: React.ReactNode;
}

export default function LinkItem({ children, to = "/" }: LinkItemProps) {
  return (
    <Link as={RouterLink} to={to}>
      <Button colorScheme="teal" size="md">
        {children}
      </Button>
    </Link>
  )
}
