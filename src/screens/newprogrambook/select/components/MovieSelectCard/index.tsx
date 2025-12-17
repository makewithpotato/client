import { Card, Title, SelectButton } from './index.styled';

interface MovieSelectCardProps {
    id: string;
    title: string;
    selected: boolean;
    onSelect: (id: string) => void;
}

export const MovieSelectCard = ({ id, title, selected, onSelect }: MovieSelectCardProps) => {
    return (
        <Card selected={selected}>
            <Title>{title}</Title>
            <SelectButton onClick={() => onSelect(id)} selected={selected}>
                {selected ? 'Deselect' : 'Select'}
            </SelectButton>
        </Card>
    );
};
