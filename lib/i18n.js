import { makeVar } from '@apollo/client';
import cookie from 'js-cookie';

const language = cookie.get('language');

const activeLanguage = makeVar(language);

export default activeLanguage;
