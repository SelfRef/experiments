import { JSDOM } from "jsdom"
import DOMPurify from "dompurify";
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import { baseUrl } from "marked-base-url";
import { gfmHeadingId, getHeadingList } from "marked-gfm-heading-id";
import markedAlert from "marked-alert";
import markedExtendedTables from "marked-extended-tables";
import markedFootnote from "marked-footnote";
import hljs from 'highlight.js';

export async function convertMdToHtml(rawMarkdown: string, prefixUrl?: string) {
	const marked = new Marked({ async: true }, markedHighlight({
		async: true,
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	}))
	if (prefixUrl) marked.use(baseUrl(prefixUrl))
	marked.use(
		gfmHeadingId(),
		gfmHeadingId(),
		markedAlert(),
		markedExtendedTables(),
		markedFootnote(),
	)

	const rawHtml = await marked.parse(rawMarkdown)
	const window = new JSDOM().window;
	const purify = DOMPurify(window);
	const html = purify.sanitize(rawHtml)

	return {
		html,
		headings: getHeadingList(),
	}
}