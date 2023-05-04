import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";



describe('Pruebas en authReducer', () => {

    const initialState = {
        logged: false
    };

    test('debe retornar el estado por defecto', () => {

        const newState = authReducer(initialState, {});

        expect(newState).toBe(initialState);

    });

    test('debe, el login, llamar a autenticar y establecer el user', () => {

        const user = { id: 'ABC', name: 'Alex' };

        const action = { type: types.login, payload: user };

        const newState = authReducer(initialState, action);

        console.log(newState);

        expect(newState).toEqual({
            logged: true,
            user: action.payload
        });

    });

    test('debe, el logout, borrar el name del usuario y logged en false', () => {

        const user = { id: 'ABC', name: 'Alex' };

        const actionLogin = { type: types.login, payload: user };

        const newStateLogin = authReducer(initialState, actionLogin);

        expect(newStateLogin).toEqual({
            logged: true,
            user: actionLogin.payload
        });

        const actionLogout = { type: types.logout };

        const newStateLogout = authReducer(newStateLogin, actionLogout);

        expect(newStateLogout).toEqual({
            logged: false
        });

    });

});