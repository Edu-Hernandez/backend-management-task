import { Body, Param, Post } from "@nestjs/common";
import { CreateProjectUseCase } from "../../application/use-cases/create-project.use-case.js";
import { CreateProjectDto } from "../../application/dto/create-project.dto.js";
export class ProjectController {
    constructor(
        private readonly createProjectUseCase: CreateProjectUseCase,
    ) { }

    @Post()
    async createProject(
        @Body() createProjectDto: CreateProjectDto,
        @Param('userId') userId: string,
    ) {
        return this.createProjectUseCase.execute(createProjectDto, userId);
    }
}
