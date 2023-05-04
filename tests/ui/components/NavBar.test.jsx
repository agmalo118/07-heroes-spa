import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));


describe('Pruebas en <NavBar/>', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Strider',
            id: 'S123'
        },
        logout: jest.fn()
    };

    beforeEach(() => jest.clearAllMocks());

    test('debe aparecer el nombre del usuario', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Strider')).toBeTruthy();

    });

    test('debe hacer logout y navigate cuando se hace click en el botón de logout', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const btnLogout = screen.getByLabelText('btnLogout');
        fireEvent.click(btnLogout);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalled();

    });

})