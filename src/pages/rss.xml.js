import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { getSite } from '../utils/consts';
import { projectPath } from '../utils/projectRoutes';

export async function GET(context) {
	const projects = await getCollection('projects');
	const site = await getSite();
	return rss({
		title: site.author.name,
		description: site.author.role,
		site: context.site,
		items: projects.map((project) => ({
			...project.data,
			link: projectPath(project.id, project.data.category),
		})),
	});
}
