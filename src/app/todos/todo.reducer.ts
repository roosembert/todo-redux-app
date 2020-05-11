import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleall, eliminarFiltro } from './todo.actions';
import { Todo } from './models/todo.model';
 
export const estadoInicial:Todo[] = [
    new Todo('Salvar a roos'),
    new Todo('que onda'),
    new Todo('simon señor'),
    new Todo('hora de trabajar')
];
 
const _todoReducer = createReducer(estadoInicial,
  on(crear, (state, {texto}) => [...state, new Todo( texto )]),

  on(borrar, (state, {id}) => state.filter(todo => todo.id !== id)),
  
  on(toggleall, (state, {completado}) => 
     state.map(todo => {
      return {
        ...todo,
        completado: completado
      }
    })
  ),

  on(toggle, (state, {id}) => {
    return state.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          completado: !todo.completado
        }
      }else{
        return todo;
      }
    });
  }),

  on(editar, (state, {id, texto}) => {
    return state.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          texto: texto
        }
      }else{
        return todo;
      }
    });

  }),
  
  on(eliminarFiltro, (state) => state.filter(todo => !todo.completado)),
  
);
 
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}