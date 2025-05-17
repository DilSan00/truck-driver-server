import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://norms777666:smodsmod@cluster0.oueayxs.mongodb.net/truck-driver?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
})
export class AppModule {}
