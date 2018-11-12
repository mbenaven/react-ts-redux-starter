WHY REDUX?
On its own, React is a useful library for creating composable views. However, React doesn't prescribe any specific way of synchronizing data throughout your application. As far as a React component is concerned, data flows down through its children through the props you specify on each element. Some of those props might be functions that update the state one way or another, but how that happens is an open question.

Because React on its own does not focus on application state management, the React community uses libraries like Redux and MobX.

Redux relies on synchronizing data through a centralized and immutable store of data, and updates to that data will trigger a re-render of our application. State is updated in an immutable fashion by sending explicit action messages which must be handled by functions called reducers. Because of the explicit nature, it is often easier to reason about how an action will affect the state of your program.

src/types/index.tsx :
    - Shape of state which Redux will store
    
    export interface StoreState {
        languageName: string;
        enthusiasmLevel: number;
    }

src/onstants/index.tsx :
    - Creates a set of message types the app can respond to
    - This const/type pattern allows us to use TypeScript's string literal types in an easily accessible and refactorable way.
    
    export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
    export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

src/actions/index.tsx
    - Set of actions and functions that create them

    export interface IIncrementEnthusiasm {
        type: constants.INCREMENT_ENTHUSIASM;
    }
    export type EnthusiasmAction = IIncrementEnthusiasm | IDecrementEnthusiasm;
    export function incrementEnthusiasm(): IIncrementEnthusiasm {
        return {
            type: constants.INCREMENT_ENTHUSIASM
        }
    }

src/reducers/index.tsx : 
    - Functions that generate changes by creating modified copies of apps state
    -  Using the object spread (...state) which allows us to create a shallow copy of our state, while replacing the enthusiasmLevel. 

    export function enthusiasm(state: IStoreState, action: EnthusiasmAction): IStoreState {
        switch (action.type) {
            case INCREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
            case DECREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
        }
        return state;
        }

Containers:
    - While components are data agnostic
    - Containers wrap components and fee them data necessary to display/modify state
    - Had to modify the hello.tsx component to modify state via onIncrement() and onDecrement() passed in as props
    - Callbacks bound to buttons
    src/components/Hello.tsx :
        function Hello({name, enthusismLevel =1, onIncrement, onDecrement})
        return (
            Hello + name + getExclaimationMarks(enthusiasmLevel)
            <button onClick={onIncrement}>+</button>
        )
    src/containers/Hello.tsx :
        - Wraps our component to pass data in
        - State values mapped to props
        - turns hello component into container using mapStateToProps and mapDispatchToProps