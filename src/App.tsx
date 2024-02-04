import { FC } from 'react';
import { PrettyNumber } from './components/PrettyNumber/PrettyNumber';

export const App: FC = () => {
  return (
    <div className="App">
      <PrettyNumber value={30} />
      <PrettyNumber value={-10} />

      {/* with no color */}
      <PrettyNumber value={-96} noColor />

      {/* prefix/suffix */}
      <PrettyNumber value={3851.234253235} prefix='$' />
      <PrettyNumber value={-3822351.234253235} suffix="%" margin="1rem" />

      {/* html attrs */}
      <PrettyNumber value={52236651.234253235} aria-label="your label" />

      {/* custom compare with number */}
      <PrettyNumber value={-5662236651.234253235} basicColorizeValue={-6662236651.234253235} />

      {/* colorized label */}
      <PrettyNumber value={0.213} className="PrettyNumber-row">
        <span>label: </span>
      </PrettyNumber>

      {/* some examples */}
      <PrettyNumber value={-0.2312312313} />
      <PrettyNumber value={-0.000005123} />
      <PrettyNumber value={0.0000000002126} />
    </div>
  );
};
