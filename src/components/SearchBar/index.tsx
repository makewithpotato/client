import { SearchBarWrapper, Input } from './index.styled';

export const SearchBar = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <SearchBarWrapper>
        <Input placeholder="Search" {...props} />
    </SearchBarWrapper>
);
