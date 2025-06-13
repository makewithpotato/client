import { useState } from 'react';
import { AnalysisResultItem } from '../AnalysisResultItem';
import { ResultsSection, ResultsTitle } from './index.styled';
import type { AnalysisResult } from '../../types';

const analysisResults: AnalysisResult[] = [
    {
        id: 'movie-title',
        label: 'Movie Title',
        content:
            'The Enchanted Forest - A mystical adventure that takes viewers on a journey through an ancient woodland where magic still exists and every tree holds a secret waiting to be discovered.',
    },
    {
        id: 'director',
        label: 'Director',
        content:
            'Directed by Sarah Johnson, known for her distinctive visual style and ability to blend fantasy elements with emotional storytelling. Her previous works include "Mystic Waters" and "The Garden of Dreams".',
    },
    {
        id: 'cast',
        label: 'Cast',
        content:
            'Starring Emma Thompson as the wise forest guardian, Michael Chen as the young adventurer, and Luna Rodriguez as the mystical tree spirit. Supporting cast includes veteran actors bringing depth to this magical ensemble.',
    },
    {
        id: 'synopsis',
        label: 'Synopsis',
        content:
            "When teenager Alex stumbles upon a hidden portal in their grandmother's backyard, they discover an enchanted forest where ancient magic thrives. Guided by a mysterious forest guardian, Alex must learn to harness their newfound abilities to protect this magical realm from dark forces that threaten to destroy it forever.",
    },
    {
        id: 'production-notes',
        label: 'Production Notes',
        content:
            'Filmed on location in the Pacific Northwest, the production used a combination of practical effects and cutting-edge CGI to bring the magical forest to life. The film took 18 months to complete, with extensive attention to detail in creating believable magical creatures and environments.',
    },
    {
        id: 'reviews',
        label: 'Reviews',
        content:
            '"A visually stunning masterpiece that captures the wonder of childhood imagination" - The Cinema Times. "Thompson delivers a career-defining performance" - Movie Weekly. Average rating: 8.2/10 from critics and 8.7/10 from audiences.',
    },
    {
        id: 'behind-scenes',
        label: 'Behind the Scenes',
        content:
            'The enchanted forest was built across 3 different locations, with some scenes requiring up to 200 crew members. The magical tree effects were achieved through a combination of animatronics and CGI, taking over 6 months to perfect.',
    },
    {
        id: 'trivia',
        label: 'Trivia',
        content:
            'Emma Thompson performed many of her own stunts. The mystical tree language heard in the film was created by a linguistics expert. Over 500 trees were planted specifically for the production, which remain as a lasting environmental legacy.',
    },
    {
        id: 'gallery',
        label: 'Gallery',
        content:
            'Behind-the-scenes photos, concept art, and production stills showcasing the incredible attention to detail in costume design, set construction, and special effects makeup that brought this magical world to life.',
    },
];

export const AnalysisResultsPanel = () => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpanded = (itemId: string) => {
        setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
    };

    return (
        <ResultsSection>
            <ResultsTitle>Analysis Results</ResultsTitle>
            {analysisResults.map((result) => (
                <AnalysisResultItem
                    key={result.id}
                    result={result}
                    isExpanded={expandedItems.includes(result.id)}
                    onToggle={toggleExpanded}
                />
            ))}
        </ResultsSection>
    );
};
