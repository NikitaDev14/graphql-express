# graphql-express
A lightweight GraphQL client which can be handled by RxJs operators (switchMap, mergeMap, concatMap, exhaustMap). It requires RxJs v.6.5.0 or higher.

# Comparison with Apollo

When you open a playground, to test the package open developer console, go to the network section and set throttling.

[Playground with graphql-express](https://stackblitz.com/edit/rxjs-j5yshn "Playground with graphql-express")

[Playground with Angular+Apollo](https://stackblitz.com/edit/simple-apollo-angular-example-qebxsp "Playground with Angular+Apollo")

# Examples

## Query with fragment

```typescript
import { query } from 'graphql-express';

const REQUEST_URL: string = 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex';

const allUsersQuery = `{
  allUsers {
    ...userFragment
  }
}`;

const userFragment = `
  fragment userFragment on User {
    id
    name
    email
    createdAt
  }`;

query(
  REQUEST_URL,
  allUsersQuery,
  null,
  [userFragment],
).pipe(
  //handling response
);
```

## Query with variable and fragment

```typescript
import { query } from 'graphql-express';

const REQUEST_URL: string = 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex';

const userQuery = `
  userQuery($id: ID) {
    User(id: $id) {
     ...userFragment
    }
  }`;

const userFragment = `
  fragment userFragment on User {
    id
    name
    email
    createdAt
  }`;

const variables = {
  id: 'ck1c8p3af1d1w0133wwv0jpkx',
};

query(
  REQUEST_URL,
  userQuery,
  variables,
  [userFragment],
).pipe(
  //handling response
);
```

## Mutation with fragment

```typescript
import { mutation } from 'graphql-express';

const REQUEST_URL: string = 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex';

const renameUserMutation = `
  updateUser(
    $id: ID!,
    $name: String
  ) {
    updateUser(
      id: $id,
      name: $name,
      commentsIds: [],
      comments: [],
      postsIds: [],
      posts: []
    ) {
      ...userFragment
    }
  }`;

const userFragment = `
  fragment userFragment on User {
    id
    name
    email
    createdAt
  }`;

const variables = {
  id: 'ck1c8p3af1d1w0133wwv0jpkx',
  name: 'test',
};

mutation(
    REQUEST_URL,
    renameUserMutation,
    variables,
    [userFragment],
).pipe(
  //handling response
);
```

## QueryBuilder


```typescript
import { QueryBuilder } from 'graphql-express';

const REQUEST_URL: string = 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex';

const userQuery: string = `
  User(id: $id) {
   ...userFragment
  }`;

const userFragment: string = `
  fragment userFragment on User {
    id
    name
    email
    createdAt
  }`;

QueryBuilder.registerHost(REQUEST_URL, true);
QueryBuilder.registerArguments(
  {
    'id': 'ID',
    'name': 'String',
  },
);

QueryBuilder.from(userQuery)
  .addFragments([userFragment])
  .addVariables(
    {
      'id': 'ck1buv43a0hv201955u808iqn',
    },
  )
  //or .mutation()
  .query()
  .pipe(
    //handling response
  );
```
