import { json, text, type RequestHandler } from '@sveltejs/kit';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const getChannelInfo = async (channel?: string) => {
	const pdata = puppeteer
		.use(StealthPlugin())
		.launch({ headless: 'new' })
		.then(async (browser) => {
			const page = await browser.newPage();
			await page.goto(`https://kick.com/api/v2/channels/${channel}`);
			const data = await page.evaluate(() => document.body.innerText);
			await browser.close();
			return data;
		});

	return await pdata;
};

export const GET: RequestHandler = async ({ url, params }) => {
	return text(await getChannelInfo(`${params.channel}`));
};
