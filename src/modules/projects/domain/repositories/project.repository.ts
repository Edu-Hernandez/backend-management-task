import { CreateProjectDto } from "../../application/dto/create-project.dto.js";
import { ProjectEntity } from "../entities/project.entity.js";

export interface ProjectRepository {
    create(createProjectDto: CreateProjectDto, userId: string): Promise<ProjectEntity>;
}