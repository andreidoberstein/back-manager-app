import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    // CrmModule,
    // FinancialModule,
    // ReportsModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    //   context: ({ req }) => ({ req }),
    // }),
  ],
  providers: [
    AppService,
    // RedisService
  ],
})
export class AppModule {}
