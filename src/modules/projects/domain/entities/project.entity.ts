export const PROJECT_ENTITY = Symbol('PROJECT_ENTITY');

export class ProjectEntity {
    constructor(
        public readonly archivedAt: Date,
        public readonly createdAt: Date,
        public readonly createdById: number,
        public readonly deletedAt: Date,
        public readonly description: string,
        public readonly id: string,
        public readonly name: string,
        public readonly ownerId: number,
        public readonly status: string,
        public readonly updatedAt: Date,
    ) { }
}