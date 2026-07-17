type ProjectCategory = 'work' | 'personal';

type ProjectRouteEntry = {
	id: string;
	data: {
		category?: ProjectCategory;
	};
};

export const projectSlug = (id: string) => id.split('/').pop() ?? id;

export const projectPath = (id: string, category: ProjectCategory = 'personal') =>
	category === 'work' ? `/work/${projectSlug(id)}/` : `/personal-projects/${projectSlug(id)}/`;

export const findProjectByRouteSlug = <T extends ProjectRouteEntry>(
	projects: T[],
	slug: string | undefined,
	category: ProjectCategory,
) => projects.find((project) => (
	project.data.category === category
	&& (project.id === slug || projectSlug(project.id) === slug)
));
