// import React from 'react';
// import ReactDOM from 'react-dom';
// import './styles/index.scss';
// import App from './App';

// ReactDOM.render(
//     <App />,
//   document.getElementById('root')
// );

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas}from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export {default as Button} from '../src/components/Button';
export {default as Menu} from '../src/components/Menu';
export {default as Alert} from '../src/components/Alert';
export {default as AutoComplete} from '../src/components/AutoComplete';
export {default as Upload} from '../src/components/Upload';
export {default as Icon} from '../src/components/Icon';
export {default as Input} from '../src/components/Input';
export {default as Progress} from '../src/components/Progress';
export {default as Transition} from '../src/components/Transition';
