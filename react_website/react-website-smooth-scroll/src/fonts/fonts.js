import {createGlobalStyle} from 'styled-components';

import EncodeSansExpanded from './encode-sans-expanded-v8-latin/encode-sans-expanded-v8-latin-regular.woff';

export default createGlobalStyle`
@font-face {
    font-family: 'Encode Sans Expanded';
    font-style: normal;
    font-weight: 400;
    src: url('${EncodeSansExpanded}') format('woff'), /* Modern Browsers */
  }
`