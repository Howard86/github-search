import React, { FC, memo } from 'react';
import NextLink from 'next/link';
import { Link, ListIcon, ListItem } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

interface InfoList {
  name: string;
  url?: string;
  icon?: IconType;
}

const InfoList: FC<InfoList> = ({ name, icon, url }) => (
  <ListItem>
    <ListIcon fontSize="lg" as={icon} />
    {url ? (
      <Link href={url} isExternal>
        {name}
      </Link>
    ) : (
      <NextLink href={`/user/${name}`} passHref>
        <Link>{name}</Link>
      </NextLink>
    )}
  </ListItem>
);

export default memo(InfoList);
