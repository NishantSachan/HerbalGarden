import { Component, OnDestroy, OnInit } from "@angular/core";
import { AsyncSubject, BehaviorSubject, from, interval, merge, Observable, Observer, of, range, ReplaySubject, Subject } from "rxjs";
import { filter, map, mergeMap, take , distinct} from "rxjs/operators";

@Component({
    selector:'app-rxjs',
    template:`<h1> From Rxjs Demo </h1>`
})
export class RxjsComponent implements OnInit, OnDestroy{
    
    ngOnInit(): void {
        // const numbers=interval(100).pipe(take(100)).pipe(filter(x=>x%5==0))
        // numbers.subscribe(x=>console.log(x))
        // const alpha= of('A','B','C','D','E','F').pipe(mergeMap((x=>range(1,6).pipe(map(i=>x+i)))));
        // alpha.subscribe(x=>console.log(x));

        var source = from([
            24, 42, 24, 24
        ]).pipe(distinct());
    
        var subscription = source.subscribe(
        function (x) { console.log('Next: ' + x); },
        function (err) { console.log('Error: ' + err); },
        function () { console.log('Completed'); });
    }

    ngOnDestroy(): void {
        console.log("From on Destroy")
    }

    // ngOnInit(): void {
    //     const numbers=interval(1000).pipe(take(6))
    //     const arr =['A','B','C','D','E','F'];
    //     const alpha=interval(1010).pipe(map(x=>arr[x]));

    //     const output$= merge(alpha,numbers);
    //     output$.subscribe(x=>console.log(x))
    // }

    // ngOnDestroy(): void {
    //     console.log("From on Destroy")
    // }
    // ngOnInit(): void {
    //     const res=of(['a','b',2,3,4,5])
    //     const rangeAlpha$=from(range(97,26))
    //     const obs=rangeAlpha$.pipe(map(val=>[Math.abs(96-val), String.fromCharCode(val)])).subscribe(val=>console.log(String(val[0])+String(val[1])));
    //  }
 
    //  ngOnDestroy(): void {
    //      console.log("From on Destroy")
    //  }

    // ngOnInit(): void {
    //     const rangeNums=from(range(23,5)).subscribe(x=>console.log(x));
    //  }
 
    //  ngOnDestroy(): void {
    //      console.log("From on Destroy")
    //  }

    // ngOnInit(): void {
    //     const data=of("Apple","Orange","Strawberry","Mango").subscribe(x=>console.log(x));
 
    //     const data2=from(["Apple","Orange","Strawberry","Mango"]).subscribe(x=>console.log(x));
    //  }
 
    //  ngOnDestroy(): void {
    //      console.log("From on Destroy")
    //  }

    // ngOnInit(): void {
    //     const nums=range(100,200).subscribe(x=>console.log(x))
    // }

    // ngOnDestroy(): void {
    //     console.log("From on Destroy")
    // }

    // ngOnInit(): void {
    //     const interval$=interval(1000);
    //     const example=interval$.pipe(take(5));

    //     const subscribe=example.subscribe(val=>console.log(val*2));
    // }

    // ngOnDestroy(): void {
    //     console.log("From on Destroy")
    // }

    // mySubject$:any;
    // ngOnInit(): void {
    //     this.mySubject$=new AsyncSubject();
    //     this.mySubject$.subscribe((x:any)=>console.log(`First Subscribe ${x}`));
    //     this.mySubject$.next(1);
    //     this.mySubject$.next(2);
    //     this.mySubject$.next(3);
    //     this.mySubject$.next(4);

    //     this.mySubject$.subscribe((x:any)=>console.log(`Second Subscribe ${x}`));
    //     this.mySubject$.next(5);
    //     this.mySubject$.next(6);

    //     this.mySubject$.subscribe((x:any)=>console.log(`Third Subscribe ${x}`));
    //     this.mySubject$.next(7);
    //     this.mySubject$.next(8);
    //     this.mySubject$.complete()
    // }
    // ngOnDestroy(): void {
    //     console.log("From on Destroy");
    //     this.mySubject$.unsubscribe();
    // } 


    // observable$:any;

    // ngOnInit(): void {
    //     this.observable$=new Observable((observer:Observer<any>)=>{
    //         observer.next(1);
    //         observer.next(2);
    //         observer.next(3);
    //         observer.next(4);
    //         observer.next(5);
    //         observer.complete();
    //     });
    //     this.observable$.subscribe((value:any)=>{
    //         console.log("The value emitted is ", value),
    //         (err:any)=>{},
    //         ()=>console.log("This is the end of the stream");
    //     });
    // }
    // ngOnDestroy(): void {
    //     console.log("From on Destroy");
    //     this.observable$.unsubscribe();
    // }
    
}


