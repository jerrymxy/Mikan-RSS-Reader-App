import { DOMParser } from 'xmldom';

const MIKANANIME_URL = "https://mikanani.me/Home/Episode/";
const MIKANANIME_BACKUP_URL = "https://mikanime.tv/Home/Episode/";
const MAGNET_PREFIX = "magnet:?xt=urn:btih:";

export function parse(content) {
	let domParser = new DOMParser();
	let xmlDoc = domParser.parseFromString(content, "application/xml");
	let items = xmlDoc.getElementsByTagName("item");
	
	let result = new Array();
	result[0] = xmlDoc.getElementsByTagName("title")[0].textContent;
	
	for (let i = 0; i < items.length; ++i) {
		let link = items[i].getElementsByTagName("link")[0].textContent;
		if (link.indexOf(MIKANANIME_URL) > -1) {
			result.push(MAGNET_PREFIX + link.substring(MIKANANIME_URL.length));
		} else if (link.indexOf(MIKANANIME_BACKUP_URL) > -1) {
			result.push(MAGNET_PREFIX + link.substring(MIKANANIME_BACKUP_URL.length));
		} else {
			continue;
		}
	}
	
	return result;
}