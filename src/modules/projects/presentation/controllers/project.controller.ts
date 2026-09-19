import { Body, Controller, Param, Post, Req } from "@nestjs/common";
import { CreateProjectUseCase } from "../../application/use-cases/create-project.use-case.js";
import { CreateProjectDto } from "../../application/dto/create-project.dto.js";
import { CurrentUser } from "../../../auth/presentation/decorators/current-user.decorator.js";

@Controller("projects")
export class ProjectController {
    constructor(
        private readonly createProjectUseCase: CreateProjectUseCase,
    ) { }

    @Post()
    async createProject(
        @Body() createProjectDto: CreateProjectDto,
        @CurrentUser() user?: { id: string}
    ) {
        const userId = user?.id ?? createProjectDto.ownerId;
        return this.createProjectUseCase.execute(createProjectDto, userId);
    }
}
