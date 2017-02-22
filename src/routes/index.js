// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./employees').default,
    require('./employee').default,

    require('./recruits').default,
    require('./recruit').default,

    require('./system').default,

    require('./news').default,
    require('./home').default,
    require('./notFound').default,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - Uptiverse`;
    route.description = route.description || '';

    return route;
  },

};
