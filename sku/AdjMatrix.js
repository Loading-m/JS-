class AdjMatrix {
  constructor(vertex) {
    this.vertex = vertex || [];
    this.quantity = this.vertex.length;
    this.adjoinArray = [];
    this.init();
  }

  //初始化数组
  init() {
    this.adjoinArray = Array(this.quantity * this.quantity).fill(0);
  }

  // 传入顶点的值，获取该顶点的列
  getVertexCol(id) {
    const index = this.vertex.indexOf(id);
    const col = [];
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[this.quantity * pIndex + index]);
    });
    return col;
  }

  getAdjoinVertex(id) {
    return this.getVertexCol(id).map((item, index) => (item ? this.vertex[index] : '')).filter(Boolean);
  }

  // 传入一个顶点，和当前顶点可达的顶点数组，将对应位置置为1
  setAdjoinVertex(id, sides) {
    const pIndex = this.vertex.indexOf(id);
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item);
      this.adjoinArray[pIndex * this.quantity + index] = 1;
    });
  }

  // 传入一个顶点数组，求出该数组所有顶点的列的合
  getColSum(params) {
    const paramsVertex = params.map((id) => this.getVertexCol(id));
    const adjoinSum = [];
    this.vertex.forEach((item, index) => {
      const rowTotal = paramsVertex.map(value => value[index]).reduce((total, current) => {
        total += current || 0;
        return total;
      }, 0);
      adjoinSum.push(rowTotal);
    });
    return adjoinSum;
  }

  //求并集
  getUnions(params) {
    const paramsColSum = this.getColSum(params);
    let unions = [];
    paramsColSum.forEach((item, index) => {
      if (item && this.vertex[index]) unions.push(this.vertex[index]);
    });
    return unions;
  }

  //求交集
  getIntersection(params) {
    const paramColSum = this.getColSum(params);
    let intersection = [];
    paramColSum.forEach((item, index) => {
      if (item >= params.length && this.vertex[index]) {
        intersection.push(this.vertex[index]);
      }
    });
    return intersection;
  }
}
