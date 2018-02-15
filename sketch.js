let brain;

function setup(){
    let a = new Matrix(2,3)
    a.randomize();
    a.print()

    function doubleIt(x) {
        return x * 2
    }

    a.map(doubleIt)
    a.print()
}

function draw(){

}
