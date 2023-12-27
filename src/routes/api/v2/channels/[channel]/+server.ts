import { BROWSERLESS_TOKEN } from '$env/static/private';
import { json, text, type RequestHandler } from '@sveltejs/kit';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const getChannelInfo = async (channel?: string) => {
	const browser = await puppeteer.use(StealthPlugin()).connect({
		browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_TOKEN}`
	});
	const page = await browser.newPage();
	await page.goto(`https://kick.com/api/v2/channels/${channel}`);
	const data = await page.evaluate(() => document.body.innerText);
	await browser.close();

	return data;
};

export const GET: RequestHandler = async ({ url, params }) => {
	return text(await getChannelInfo(`${params.channel}`));
};
