import { Inject, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../dto/create-project.dto.js";
import { PROJECT_ENTITY, ProjectEntity } from "../../domain/entities/project.entity.js";
import type { ProjectRepository } from "../../domain/repositories/project.repository.js";

@Injectable()
export class CreateProjectUseCase {
    constructor(
        @Inject(PROJECT_ENTITY)
        private readonly projectRepository: ProjectRepository,
    ) { }

    async execute(dto: CreateProjectDto, userId: string): Promise<ProjectEntity> {
        return this.projectRepository.create({
            name: dto.name,
            description: dto.description,
            ownerId: dto.ownerId,
        }, 
        userId);
    }
}