import { SearchBarWrapper, Input, SearchIcon } from './index.styled';

export const SearchBar = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <SearchBarWrapper>
        <SearchIcon>🔍</SearchIcon>
        <Input placeholder="Search" {...props} />
    </SearchBarWrapper>
);
