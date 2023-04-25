import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StoreInscriptionService } from './store-inscription.service';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { StoreInscription } from './entities/store-inscription.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { Helper } from 'src/commons/shared/helpers';
import { CreateStoreInscriptionDto } from './dto/store-inscription.dto';

@Controller('store-inscription')
export class StoreInscriptionController {
    constructor(
        private readonly storeInscription: StoreInscriptionService
    ){}

    @ApiCreatedResponse({ type: StoreInscription})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties:{
                name:{ type: 'string' },
                localisation:{ type: 'string' },
                ville:{ type: 'string' },
                commune:{ type: 'string' },
                status:{ type: 'integer' },
                image: {
                    type: 'string',
                    format: 'binary',
                  },
            }
        }
    })
    @ApiOperation({ summary: 'Create Store Inscription' })
    @ApiOkResponse({ type: StoreInscription, description: 'Store Inscription' })
    @ApiBadRequestResponse()
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: Helper.destinationPath,
            filename: Helper.customFileName,
          }),
        }),
    )
    create(
        @Body() storeInscriptionDto: CreateStoreInscriptionDto,
        @UploadedFile() file: Express.Multer.File,
        @Req() req: Request,
    ){
        storeInscriptionDto.image = file.filename,
        storeInscriptionDto.image_url = `${req.protocol}://${req.get('Host')}/api/store${file.path}`

        return this.storeInscription.createStoreInscription(storeInscriptionDto)
    }
}
