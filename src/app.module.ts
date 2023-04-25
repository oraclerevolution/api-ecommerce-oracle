import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorieModule } from './categorie/categorie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PictureModule } from './picture/picture.module';
import { ColorsModule } from './colors/colors.module';
import { ScentModule } from './scent/scent.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type:"postgres",
      host:'localhost',
      port: 5432,
      username:"postgres",
      password:'postgres',
      database:"prezer",
      autoLoadEntities:true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: true,
      synchronize: true,
    }),

    CategorieModule,

    StoreModule,

    ProductModule,

    OrderModule,

    PictureModule,

    ColorsModule,

    ScentModule,

    PaymentModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
