class SpecAdjoinMatrix extends AdjMatrix {
  constructor(specList, specCombinationList) {
    super(specList.reduce((total, current) => [...total, ...current.list], []));
    this.specList = specList;
    this.specCombinationList = specCombinationList;
    //根据可选规格列表矩阵创建
    this.initSpec();
    //同级顶点创建
    this.initSameLevel();
  }

  /**
   * 根据可选规格组合填写邻接矩阵的值
   */
  initSpec() {
    this.specCombinationList.forEach((item) => {
      this.fillInSpec(item.specs);
    });
  }

  //填写同级顶点
  initSameLevel() {
    //获得初始所有可选项
    const specsOption = this.getIntersection(this.vertex);
    this.specList.forEach(item => {
      const params = [];
      //获取同级别顶点
      item.list.forEach((value) => {
        if (specsOption.includes(value)) params.push(value);
      });
      this.fillInSpec(params);
    });
  }

  //传入顶点数组，查询出可选规格
  getSpecsOptions(params) {
    let specOptionCanChoose = [];
    if (params.some(Boolean)) {
      //至少有一个
      specOptionCanChoose = this.getIntersection(params.filter(Boolean));
    } else {
      specOptionCanChoose = this.getUnions(this.vertex);
    }
    return specOptionCanChoose;
  }

  //填写邻接矩阵的值
  fillInSpec(params) {
    //specs: ["紫色", "套餐一", "64G"]
    params.forEach(param => {
      //"紫色" ["紫色", "套餐一", "64G"]
      //"套餐一" ["紫色", "套餐一", "64G"]
      //"64G" ["紫色", "套餐一", "64G"]
      this.setAdjoinVertex(param, params);
    });
  }
}
