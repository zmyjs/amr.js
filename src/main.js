import AMR from './amr/amr.js';

class MyAMR extends AMR {
    constructor(file, params) {
        super(params);
        this.data = this.decode(file);
    }

    play() {
        return AMR.util.play(this.data);
    }
}

export default AMR;