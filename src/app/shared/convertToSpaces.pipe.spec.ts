import { ConvertToSpacesPipe } from "./convert-to-spaces.pipe";

xdescribe('ConvertToSpaces',()=>{
    it('should convert the character to space',()=>{
        let pipe=new ConvertToSpacesPipe();
        let res=pipe.transform('HBM-MNT','-');
        expect(res).toBe('HBM MNT')
    })
})