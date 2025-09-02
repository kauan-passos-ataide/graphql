import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Query(() => String)
  hello() {
    const hello = this.appService.getHello();
    return hello;
  }
}
