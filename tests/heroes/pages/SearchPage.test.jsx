
import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPage/>', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();

    });

    test('debe mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg')

    });

    test('debe tener la clase d-none el div con el texto "Search a hero" después de realizar una busqueda', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Search a hero...').classList.contains('d-none')).toBeTruthy();

    });

    test('debe mostrar un error si no se encuentra el hero (spiderman3123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=spiderman3123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert-danger');

        expect(alert.classList.contains('d-none')).toBeFalsy();

    });

    test('debe llamar el navigate a la pantalla nueva al hacer una busqueda', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const searchText = 'batman';

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: searchText } });

        const form = screen.getByRole('searchForm');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${searchText}`);
    });

})