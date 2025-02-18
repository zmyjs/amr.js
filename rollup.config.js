import terser from '@rollup/plugin-terser';

const banner = `
/**
 * @name ${process.env.npm_package_name}
 * @version ${process.env.npm_package_version}
 * @build ${Date.now()}
 * @author ZMY
 * @license MIT
 */
`.trim();

function getOutputItem(format, suffix) {
    return {
        file: `dist/amrplayer.${suffix}`,
        format,
        strict: false,
        banner,
        plugins: [terser()],
    };
}

export default {
    input: 'src/main.js',
    output: [
        getOutputItem('es', 'es.js'),
        getOutputItem('cjs', 'cjs.js'),
        {
            ...getOutputItem('iife', 'js'),
            name: 'AMRPlayer',
        }
    ]
};