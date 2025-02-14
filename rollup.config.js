import terser from '@rollup/plugin-terser';

export default {
    input: 'src/main.js',
    output: [
        {
            file: 'dist/amrplayer.es.js',
            format: 'es',
            strict: false
        },
        {
            file: 'dist/amrplayer.cjs.js',
            format: 'cjs',
            strict: false
        },
        {
            file: 'dist/amrplayer.js',
            format: 'iife',
            name: 'AMRPlayer',
            strict: false,
            plugins: [terser()]
        },
    ]
};