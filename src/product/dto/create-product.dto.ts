import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Color } from 'src/colors/entities/color.entity';
import { Scent } from 'src/scent/entities/scent.entity';
import { Store } from 'src/store/entities/store.entity';
import { Product } from '../entities/product.entity';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsOptional()
  code: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  image: string;

  @IsOptional()
  status: number;

  @IsOptional()
  categorie: Categorie;

  @IsNotEmpty()
  category_id: string;

  @IsOptional()
  store: Store;

  @IsNotEmpty()
  store_id: string;

  @IsOptional()
  colors_id: [];

  @IsOptional()
  colors: Color[];

  @IsOptional()
  scents_id: [];

  @IsOptional()
  scents: Scent[];

  @IsOptional()
  image_url: string;
}
