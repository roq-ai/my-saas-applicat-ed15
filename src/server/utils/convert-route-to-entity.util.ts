const mapping: Record<string, string> = {
  'account-managers': 'account_manager',
  guests: 'guest',
  keywords: 'keyword',
  sellers: 'seller',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
