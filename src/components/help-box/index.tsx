import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Amazon Seller'];
  const roles = ['Guest', 'Amazon Seller', 'Account Manager'];
  const applicationName = 'My SaaS application';
  const tenantName = 'Seller';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As an Amazon Seller, I want to create an account in the SaaS application so that I can use the tool to scrape keywords from my Amazon Seller Central backend.

2. As an Amazon Seller, I want to add my Amazon Seller Central credentials to the SaaS application so that the tool can access my backend data for scraping keywords.

3. As an Amazon Seller, I want to initiate the keyword scraping process for my Search Query Performance section so that I can obtain relevant keywords for my products.

4. As an Amazon Seller, I want to view the list of scraped keywords from my Amazon Seller Central backend so that I can analyze and use them for my product listings.

5. As an Amazon Seller, I want to invite an Account Manager to my Seller account in the SaaS application so that they can help me manage my keywords and listings.

6. As an Account Manager, I want to accept the invitation from the Amazon Seller to join their Seller account in the SaaS application so that I can help them manage their keywords and listings.

7. As an Account Manager, I want to view the list of scraped keywords from the Amazon Seller Central backend so that I can analyze and use them for the Amazon Seller's product listings.

8. As an Account Manager, I want to update the list of scraped keywords in the SaaS application so that the Amazon Seller's product listings are optimized with the most relevant keywords.

9. As a Guest, I want to request access to the SaaS application so that I can learn more about the tool and its benefits for Amazon Sellers.

10. As an Amazon Seller, I want to approve or deny Guest access requests to the SaaS application so that I can control who can view and interact with my Seller account and its data.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
