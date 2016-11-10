import gallery from './App';
import {loadJSON} from './helpers';
loadJSON(json => gallery(json, 'root'));
