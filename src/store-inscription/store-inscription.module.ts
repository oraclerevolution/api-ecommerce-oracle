import { Module } from '@nestjs/common';
import { StoreInscriptionController } from './store-inscription.controller';
import { StoreInscriptionService } from './store-inscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreInscription } from './entities/store-inscription.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/auth/strategies/jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([StoreInscription]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'secret-generate-eam',
      signOptions:{ expiresIn: '60m'}
    })
  ],
  controllers: [StoreInscriptionController],
  providers: [StoreInscriptionService, JwtStrategy]
})
export class StoreInscriptionModule {}
