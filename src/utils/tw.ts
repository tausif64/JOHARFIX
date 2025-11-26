// components/utils/tw.js
import { create } from 'twrnc';

// require the tailwind config using the explicit .js extension
const tailwindConfig = require('../../tailwind.config.js');

const tw = create(tailwindConfig);

export default tw;
