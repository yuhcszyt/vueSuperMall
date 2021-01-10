export function sum(num1,num2) {
    return num1+num2;
}

export function debounce(fun,delay){
  let timer=null;
  return function (...args) {
    if(timer) clearTimeout(timer);
    timer=setTimeout(()=>{
      return fun.apply(this,args);
    },delay)
  }
}
