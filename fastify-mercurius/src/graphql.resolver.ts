import {
  ObjectType,
  Field,
  Int,
  Args,
  ResolveField,
  Parent,
  Resolver,
  Query,
} from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Int, { nullable: true })
  votes?: number;
}

@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => [Post])
  posts: Post[];
}

@Resolver(() => Author)
export class AuthorsResolver {
  @Query(() => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return { id, firstName: 'John', lastName: 'Doe' };
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return [
      { id: 1, title: 'Post 1', votes: 2 },
      { id: 2, title: 'Post 2', votes: 3 },
    ];
  }
}
