import { CreateProjectDto } from "../../application/dto/create-project.dto";
import { PROJECT_ENTITY, ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
    constructor(
        @Inject(PROJECT_ENTITY)
        // private readonly prisma: PrismaService,
    ) { }

    async create(createProjectDto: CreateProjectDto, userId: string): Promise<ProjectEntity> {
        return {
            archivedAt: new Date(),
            createdAt: new Date(),
            createdById: Number(userId),
            deletedAt: new Date(),
            description: 'Description 1',
            id: '1',
            name: 'Project 1',
            ownerId: Number(userId),
            status: 'ACTIVE',
            updatedAt: new Date(),
        }
    }
}