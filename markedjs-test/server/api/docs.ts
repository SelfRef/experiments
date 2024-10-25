import type { HeadingData } from "marked-gfm-heading-id";
import { convertMdToHtml } from "~/server/utils/markdown";

export default defineEventHandler(async event => {
	const storage = useStorage('assets:server');
	const noteList = await storage.getKeys();

	const notePromisses = noteList.map(async note => {
		let fileContent = await storage.getItem(note);
		const data = await convertMdToHtml(fileContent?.toString() as string)

		const nameParts = note.match(/(.+)\(([0-9]+)\)/)
		return {
			name: nameParts?.[1],
			headingsInFile: Number.parseInt(nameParts?.[2]),
			html: data.html,
			headings: data.headings,
		}
	})

	return await Promise.all(notePromisses)
});