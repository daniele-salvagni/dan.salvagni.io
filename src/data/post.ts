type MarkdownInstance = import('astro').MarkdownInstance<any>;
// Which mode is the environment running in? https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
const { MODE } = import.meta.env;

export type Post = {
	title: string,
	slug: string,
	preview: string,
	subtitle: string,
	timestamp: number,
	collection: string,
	draft: boolean,
	date: string,
	file: URL,
}

// Maps a single post to the Post type
export function single(post: MarkdownInstance): Post {
	const slug = post.file.split('/').reverse()[0].replace('.md', '');
	return {
		...post.frontmatter,
		Content: post.Content,
		slug: slug,
		draft: post.file.split('/').reverse()[1] === 'drafts',
		timestamp: (new Date(post.frontmatter.date)).valueOf()
	}
}

// Gets all published posts (draft included if dev mode) of a collection
export function published(posts: MarkdownInstance[], collection: string): Post[] {
	return posts
		.filter(post => post.frontmatter.title )
		.map(post => single(post))
		.filter(post => post.collection === collection)
		.filter(post => MODE === 'development' || !post.draft)
		.sort((a, b) => b.timestamp - a.timestamp)
}

