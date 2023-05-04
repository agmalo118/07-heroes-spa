import { types } from "../../../src/auth/types/types"


describe('Pruebas en "Types.js"', () => {
    test('debe regresar estos types', () => {

        //Si se está definiendo la app, con poner que se espera string es suficiente
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });

    })
})