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
	output: string[];
	metrics?: Metrics;
}

export interface Urls {
	get: string;
	cancel: string;
}

export interface Input {
	width: number;
	height: number;
	prompt: string;
	init_image: string;
	num_outputs: string;
	guidance_scale: number;
	prompt_strength: number;
	num_inference_steps: number;
}

export interface Metrics {
	predict_time: number;
}
