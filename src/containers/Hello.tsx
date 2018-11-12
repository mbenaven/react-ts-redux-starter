import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../actions/';
import Hello from '../components/Hello';
import { IStoreState } from '../types/index';

// Here we map the state values to the props, which is why TypeScript is displayed in the text.
// Wraps our Hello.tsx component to pass data in
// We use connect function to turn our Hello.tsx component into a container 
// To do this we need to set the props using mapStateToProps and mapDispatchToProps

// mapStateToProps which massages the data from the current store to part of the shape that our component needs.
export function mapStateToProps({ enthusiasmLevel, languageName }: IStoreState) {
return {
    enthusiasmLevel,
    name: languageName,
  } 
}

// mapDispatchToProps which creates callback props to pump actions to our store using a given dispatch function.
export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    onIncrement: () => dispatch(actions.incrementEnthusiasm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);

