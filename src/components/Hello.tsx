import * as React from 'react';

// This is the TS specific typing implementation
export interface IProps {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

// Writing functions is one of two primary ways React allows us to make components. If we wanted, we could have written it out as a class as follows:
// Use classes over SFCs when you have state or need to handle lifecyle hooks.
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
