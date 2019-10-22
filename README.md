# graphql-express
A lightweight GraphQL client which can be handled by RxJs operators (switchMap, mergeMap, concatMap, exhaustMap).

# Comparing with Apollo

[Playground for graphql-express](https://stackblitz.com/edit/rxjs-j5yshn "Playground for graphql-express")

[Playground for Angular+Apollo](https://stackblitz.com/edit/simple-apollo-angular-example-qebxsp "Playground for Angular+Apollo")



# Examples

## Query with fragment

```typescript
import { Observable } from 'rxjs';
import { query } from 'graphql-express';
import { map } from 'rxjs/operators';

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
import { Observable } from 'rxjs';
import { query } from 'graphql-express';
import { map } from 'rxjs/operators';

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
