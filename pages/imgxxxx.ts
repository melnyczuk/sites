import dynamic from 'next/dynamic';
import Component from '../src/works/imgxxxx';
import '../public/static/base.css';

// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(Component), { ssr: false });
