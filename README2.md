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

src/constants/index.tsx :
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
    - Containers wrap components and feed them data necessary to display/modify state
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

Service:
    Propagate data via state with redux
    https://x-team.com/blog/react-redux-api-actions-reducers/
    Axios to make the request
    https://alligator.io/react/axios-react/
    https://mediatemple.net/blog/tips/loading-and-using-external-data-in-react/
    https://github.com/axios/axios/blob/14057dc0bd9811a9fda773588f66de9f4aa0f617/README.md
    https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2

    re-Invent:
        Reducers that intiialize state with hard coded data
        APp loads reducers 
        Each page reads/modifies data
        if state is blank load from db or based on user input
        ie showTime
        Look at movie implemantion
    
    https://alligator.io/redux/redux-thunk/
    Redux thunk is used for communicating asychronously with an external API to retreive/save data

Redux Notes:
    Redux is a predictable state container for JS apps:
    Provides a single object with every piece of application state of the app
        - Weather nav on mobile open
        - weather shopping cart is open
        - alert messages
        - api data
    Think of it as a immutable ledger that appended to each time an action occurs
    Each time something is modified an entirely new copy of state tree is created

    Criticisms : complex, steep learning curve, verbose (lot of code to write)

    Actions:
        Objects (not functions)
            Payloads of information that send data from app to store
            Only source of info for the store
            Send them to store using store.dispatch();
            Actions are dispatched and hit reducers which modify the state
        
        Actions must have a type. (defined as a string constant)
        Pass as little data in action as possible
        Examples:
        {
            type: ADD_TODO,
            text: 'Build my first Redux app'
        }

        {
            type: TOGGLE_TODO,
            index: 5
        }

    Action Creators:
        Functions that create ations

        function addTodo(text) {
            return {
                type: ADD_TODO,
                text
            }
        }

        We pass the result of the action function to the dispatch function();
        dispatch(addTodo(text))
        dispatch(completeTodo(index))
    
Reducers
    Specify how the applications state changes in response to actions sent to the store. Actions only describe what happened, nothing about state change

    Redux app state is stored in a single object
        Best design to think of minimal represenatition of apps state in object
    
            {
        visibilityFilter: 'SHOW_ALL',
        todos: [
            {
            text: 'Consider using Redux',
            completed: true
            },
            {
            text: 'Keep all state in a single tree',
            completed: false
            }
        ]
        }

    Reducer: Pure function that takes previous state and action and returns next state
    object.assign creates a copy of the state object with new values
    We never write directly to state but rather return new objects.
    The new 

            function todoApp(state = initialState, action) {
            switch (action.type) {
                case SET_VISIBILITY_FILTER:
                return Object.assign({}, state, {
                    visibilityFilter: action.filter
                })
                default:
                return state
            }
            }

    REDUCER COMPOSITION:
        When multiple reducers manager its own part of the global state, the state paramenter is different for every reducer and corresponds to the part of the state it manages

        We do this by seperating the reducers into seperate files for larger apps and using combineReducers()
        const todoApp = combineReducers({
          visibilityFilter,
          todos
        })

Store
    Holds application state
    Allows acess to state via getState()
    allows state to be updated via dispatch(action)
    registers listeners via subscribe(listener)
    Only one store for redux app, spliting data handling logic is done with Reducer Composition

    Creating a store is easy when you have a reducer. In this case we set the initial value as the state from the server.
    const store = createStore(todoApp, window.STATE_FROM_SERVER)

https://redux.js.org/basics/usagewithreact

Re-invent notes:
		Actions
			Action Creators:
				sentText()
					- Post req with axios
				selectMovie()
				selectTime()
				selectDay()
				selectSeats()
		State Object:
			?
		Reducers:
			reducer_active?
			rootReducer?
				Just pulls in from the other ones

			Redux-dev-tools

		Containers:
			movie-detials
				map state to properties of class
				selectTime = actionCreate goes to reducer to update state
				bindActionCreate(dispatches that action creator)
				Exporting class and functions
				reducer_movies: 
		COmponents: