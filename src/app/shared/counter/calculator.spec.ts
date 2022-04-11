import { Calculator } from "./calculator";
xdescribe("Calculator",()=>{
    let res:any=null;
    let x=2;
    let y=3;
    beforeEach(()=>{
        res=new Calculator();
    })
    it("should add the number",()=>{
        let answer=res.add(x,y);
        expect(answer).toBe(5)
    })
    it("should multiply the number",()=>{
        let answer=res.multiply(x,y);
        expect(answer).toBe(6)
    })
})