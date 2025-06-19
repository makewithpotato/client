import React from 'react';
import type { MovieFormData } from '../../type';
import { GENRES } from '../../type';
import { Form, FormGroup, Label, Input, Select } from './index.styled';

interface MovieFormProps {
    formData: MovieFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({ formData, onChange }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Movie Title*</Label>
                <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    placeholder="Enter movie title"
                />
            </FormGroup>
            <FormGroup>
                <Label>Director*</Label>
                <Input
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={onChange}
                    placeholder="Enter director's name"
                />
            </FormGroup>
            <FormGroup>
                <Label>Genre*</Label>
                <Select name="genre" value={formData.genre} onChange={onChange}>
                    <option value="">Select a genre</option>
                    {GENRES.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </Select>
            </FormGroup>
            <FormGroup>
                <Label>Release Date*</Label>
                <Input type="date" name="releaseDate" value={formData.releaseDate} onChange={onChange} />
            </FormGroup>
            <FormGroup>
                <Label>Cast (Main Actors)*</Label>
                <Input
                    type="text"
                    name="cast"
                    value={formData.cast}
                    onChange={onChange}
                    placeholder="e.g., Tom Hanks, Morgan Freeman"
                />
            </FormGroup>
        </Form>
    );
};
