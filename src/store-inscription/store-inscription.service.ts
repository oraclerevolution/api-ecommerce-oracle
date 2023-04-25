import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import bcrypt = require('bcryptjs')
import { StoreInscription } from './entities/store-inscription.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateStoreInscriptionDto } from './dto/store-inscription.dto';
import JwtUtils from 'src/shared/utils/jwt.utils';
import { StoreService } from 'src/store/store.service';
import { Store } from 'src/store/entities/store.entity';

@Injectable()
export class StoreInscriptionService {
    constructor(
        @InjectRepository(StoreInscription)
        private storeInscriptionRepository: Repository<StoreInscription>,
        private storeService: StoreService,
        private storeRepository: Repository<Store>,
        private jwtService: JwtService
    ){}

    async createStoreInscription(createStoreInscriptionDto: CreateStoreInscriptionDto): Promise<any>{
        createStoreInscriptionDto.password = await bcrypt.hash(createStoreInscriptionDto.password, 10);
        const newStorInscription = this.storeInscriptionRepository.create({
            name: createStoreInscriptionDto.name,
            localisation: createStoreInscriptionDto.location,
            ville: createStoreInscriptionDto.city,
            commune: createStoreInscriptionDto.common,
            status: createStoreInscriptionDto.status,
            email: createStoreInscriptionDto.email,
            telephone: createStoreInscriptionDto.telephone_number,
            image: createStoreInscriptionDto.image,
            image_url: createStoreInscriptionDto.image_url,
            password: createStoreInscriptionDto.password
        });
        try {
            const storeInscription = await this.storeInscriptionRepository.save(newStorInscription)
            const token = await JwtUtils.assignJwtToken(storeInscription.id, this.jwtService)
            return {storeInscription, token}
        } catch (error) {
            throw new ConflictException(error)
        }
    }

    async validateStoreInscription(id: string): Promise<StoreInscription>{
        const storeInscription = await this.storeInscriptionRepository.findOne({
            where:{id: id}
        });
        if(!storeInscription){
            throw new NotFoundException('Store Inscription not found');
        }else{
            storeInscription.status = 0
            await this.storeInscriptionRepository.save(storeInscription);
            //create a new Store
            const newValidatedStore = this.storeRepository.create({
                name: storeInscription.name,
                location: storeInscription.localisation,
                city: storeInscription.ville,
                common: storeInscription.commune,
                status:1,
                email: storeInscription.email,
                telephone_number: storeInscription.telephone,
                image: storeInscription.image,
                image_url: storeInscription.image_url,
                password: storeInscription.password
            })
            await this.storeRepository.save(newValidatedStore)
            return storeInscription;
        }
    }
}
