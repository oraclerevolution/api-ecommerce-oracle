import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "store-inscription"
})
export class StoreInscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        type: String,
    })
    @Column({
        unique: true,
    })
    name: string;

    @ApiProperty({
        type: String,
    })
    @Column()
    localisation: string;

    @ApiProperty({
        type: String,
    })
    @Column()
    ville: string;

    @ApiProperty({
        type: Number,
        default: 1,
    })
    @Column({
    default: 1,
    })
    status: number;

    @ApiProperty({
        type: String,
    })
    @Column()
    commune: string;

    @ApiProperty({
        type: String,
    })
    @Column({
        unique: true,
    })
    telephone: string;

    @ApiProperty({
        type: String,
    })
    @Column({
        unique: true,
    })
    email: string;

    @ApiProperty({
        type: String,
    })
    @Column()
    password: string;

    @ApiProperty({
        type: String,
    })
    @Column()
    image: string;

    @ApiProperty({
        type: String,
        nullable: true,
      })
    @Column({ nullable: true })
    image_url: string;
}