import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb+srv://norms777666:smodsmod@cluster0.oueayxs.mongodb.net/truck-driver',
    ),
  ],
})
export class AppModule {}
