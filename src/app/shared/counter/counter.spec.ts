import {Counter} from './counter'
xdescribe("Counter",()=>{
    let cnt:any=null;
    beforeEach(()=>{
        cnt=new Counter();
    })
    it("should increment the counter by 1",()=>{
        let cnt= new Counter();//arrange
        cnt.increment();//act
        expect(cnt.counter).toBe(1)//assert
    })
    it("should decrement the counter by 1",()=>{
        let cnt=new Counter();
        cnt.decrement();
        expect(cnt.counter).toBe(-1)
    })
})