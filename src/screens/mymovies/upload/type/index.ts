export interface MovieFormData {
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
    cast: string;
    customPrompts: string[];
    customRetrievals: string[];
}

export const DEFAULT_CUSTOM_PROMPTS = [''];

export const DEFAULT_CUSTOM_RETRIEVALS = [''];

export const INITIAL_FORM_DATA: MovieFormData = {
    title: '',
    director: '',
    genre: '',
    releaseDate: '',
    cast: '',
    customPrompts: [...DEFAULT_CUSTOM_PROMPTS],
    customRetrievals: [...DEFAULT_CUSTOM_RETRIEVALS],
};

export const GENRES = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Horror',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'War',
    'Western',
];
