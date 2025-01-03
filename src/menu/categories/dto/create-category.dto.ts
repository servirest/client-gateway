
import { IsString, Matches, IsNotEmpty, IsBoolean, IsOptional, ValidateIf } from 'class-validator';
import { IsStartBeforeEnd } from './is-start-before-end.decorator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  category_name : string

  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'El formato de start_time debe ser HH:mm',
  })
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'El formato de end_time debe ser HH:mm',
  })
  @IsNotEmpty()
  end_time: string;

  // Validación a nivel de la clase: Compara start_time con end_time
  @ValidateIf(o => o.start_time && o.end_time)
  @IsStartBeforeEnd()
  check_times: string;

  @IsString()
  @IsOptional()
  category_description: string;

  @IsBoolean()
  @IsOptional()
  status: boolean | null;
}

