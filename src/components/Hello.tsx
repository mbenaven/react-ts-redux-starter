/**
 * Refer to StatefulHello.tsx if you want to see non-redux implementation
 * Below are the class and function implementations
 * Two buttons which update the number of exclaimation points represented by this.state.currentEnthusiasm
 * Store values are set in src/index.tsx and mapped to props in the Hello.tsx container 
 */

import * as React from 'react';

export interface IProps {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

// Writing functions is one of two primary ways React allows us to make components. If we wanted, we could have written it out as a class:
// Use classes over SFCs when you have state or need to handle lifecyle hooks.

// Callbacks bound to the buttons
function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: IProps) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
      <div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

// // Stateless Function Component [SFC] Implementation of the above:
// function Hello({ name, enthusiasmLevel = 1 }: Props) {
//   if (enthusiasmLevel <= 0) {
//     throw new Error('You could be a little more enthusiastic. :D');
//   }

//   return (
//     <div className="hello">
//       <div className="greeting">
//         Hello {name + getExclamationMarks(enthusiasmLevel)}
//       </div>
//     </div>
//   );
// }

export default Hello;

// Helpers
function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
