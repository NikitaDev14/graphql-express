# graphql-express
A lightweight GraphQL client which can be handled by RxJs operators (switchMap, mergeMap, concatMap, exhaustMap).

# Examples

`import { Observable } from 'rxjs';
import { query } from 'graphql-express';
import { map } from 'rxjs/operators';

const REQUEST_URL: string = 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex';

const allUsersQuery = '{
  allUsers {
    ...userFragment
  }
}';

const userFragment = '
  fragment userFragment on User {
    id
    name
    email
    createdAt
  }
';

query(
  REQUEST_URL,
  allUsersQuery,
  null,
  [userFragment],
).pipe(
  //handling response
);`
