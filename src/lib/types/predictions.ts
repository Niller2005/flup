export interface Predictions {
	previous: string | null;
	next: string | null;
	results: Prediction[];
}

export interface Prediction {
	id: string;
	version: string;
	urls: Urls;
	created_at: string;
	started_at: string;
	completed_at: string;
	source: string;
	status: string;
	input?: Input;
	output?: string[];
}

export interface Urls {
	get: string;
	cancel: string;
}

export interface Input {
	prompt: string;
}
