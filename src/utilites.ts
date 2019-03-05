export interface GeneratorCreater {
  (self: SelfGuidedGenerator): Generator;
}

export class SelfGuidedGenerator {
  constructor(generatorCreater: GeneratorCreater) {
    this.generator = generatorCreater(this);
    this.generator.next();
  }
  public next(arg?: any) {
    return this.generator.next(arg);
  }
  public return(arg?: any) {
    return this.generator.return(arg);
  }
  public generator: Generator;
}
