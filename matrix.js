class Matrix {
    constructor(rows, cols){
        this.rows = rows
        this.cols = cols
        this.data = [];

        for (let i = 0; i < this.rows; i++) {
            this.data[i] = []
            for (let j = 0; j < this.cols; j++ ) {
                this.data[i][j] = 0;
            }
        }
    }

    static fromArray(array) {
      let m = new Matrix(array.length, 1)

      for (let i = 0; i < array.length; i++) {
        m.data[i][0] = array[i]
      }
      return m;
    }

    toArray(matrix) {
      let arr = []

      for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++ ) {
              arr.push(this.data[i][j])
          }
      }

      return arr
    }

    add(n) {
        if(n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++ ) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++ ) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    static transpose(matrix) {
        let result = new Matrix(matrix.cols, matrix.rows);

        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++ ) {
                result.data[j][i] = matrix.data[i][j];
            }
        }
        return result
    }

    static substract(a, b) {
      // Return a new Matrix a-b
      let results = new Matrix(a.rows, a.cols)

      for (let i = 0; i < results.rows; i++) {
          for (let j = 0; j < results.cols; j++ ) {
              results.data[i][j] = a.data[i][j] - b.data[i][j];
          }
      }
      return results
    }

    static multiply(a, b) {
        // Matrix product
        if(a.cols != b.rows) {
            console.log('Columns of A must match number of rows of rows of B');
            return undefined;
        }

        let result = new Matrix(a.rows, b.cols);

        for(let i = 0; i < result.rows; i++) {
            for(let j = 0; j < result.cols; j++) {
                // Dot product of values in cols
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }

    multiply(n) {
        if(n instanceof Matrix) {
          // hadamard product
          for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
              this.data[i][j] *= n.data[i][j]
            }
          }
        } else {
          // Scalar product
          for (let i = 0; i < this.rows; i++) {
              for (let j = 0; j < this.cols; j++ ) {
                  this.data[i][j] *= n;
              }
           }
        }
    }

    map(func) {
        // Apply a function to every element of matrix
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++ ) {
                let val = this.data[i][j]
                this.data[i][j] = func(val);
            }
        }
    }

    static map(matrix, func) {
      let results = new Matrix(matrix.rows, matrix.cols);
      // Apply a function to every element of Matrix
      for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.cols; j++ ) {
              let val = matrix.data[i][j]
              results.data[i][j] = func(val);
          }
      }

      return results
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = []
            for (let j = 0; j < this.cols; j++ ) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    print() {
        console.table(this.data)
    }
}
