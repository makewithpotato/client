import { Card, Poster, Title } from './index.styled';

export interface MovieSelectCardProps {
    id: string;
    image: string;
    title: string;
    selected?: boolean;
    onSelect: (id: string) => void;
}

export const MovieSelectCard = ({ id, image, title, selected, onSelect }: MovieSelectCardProps) => (
    <Card selected={selected} onClick={() => onSelect(id)}>
        <Poster src={image} alt={title} />
        <Title>{title}</Title>
    </Card>
);
