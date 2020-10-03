import dynamic from 'next/dynamic';
import Component from '../works/ImgXXXX';

// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(Component), { ssr: false });
