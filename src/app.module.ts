import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FactoryModule } from './modules/factory/factory.module';
import { WorkshopModule } from './modules/workshop/workshop.module';

// mongodb://localhost:27017/truck
// mongodb+srv://norms777666:smodsmod@cluster0.oueayxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FactoryModule,
    WorkshopModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/truck',
    ),
  ],
})
export class AppModule {}
