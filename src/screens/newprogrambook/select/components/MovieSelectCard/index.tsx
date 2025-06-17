import { Card, Image, Title, SelectButton } from './index.styled';

interface MovieSelectCardProps {
    id: string;
    image: string;
    title: string;
    selected: boolean;
    onSelect: (id: string) => void;
}

export const MovieSelectCard = ({ id, image, title, selected, onSelect }: MovieSelectCardProps) => {
    return (
        <Card selected={selected}>
            <Image src={image} alt={title} />
            <Title>{title}</Title>
            <SelectButton onClick={() => onSelect(id)}>{selected ? 'Deselect' : 'Select'}</SelectButton>
        </Card>
    );
};
