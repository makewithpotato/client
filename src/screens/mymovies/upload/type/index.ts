export interface MovieFormData {
    title: string;
    director: string;
    genre: string;
    releaseDate: string;
    cast: string;
}

export const INITIAL_FORM_DATA: MovieFormData = {
    title: '',
    director: '',
    genre: '',
    releaseDate: '',
    cast: '',
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
