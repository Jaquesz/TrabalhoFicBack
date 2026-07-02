import { IsNumber, IsString } from "class-validator";

export class CreateMatriculaDto {
    @IsString()
    userId! : string

    @IsNumber()
    cursoId! : number
}
