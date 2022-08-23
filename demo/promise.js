class Promise{

    constructor(executor){
        this.PromiseState = 'pending'
        this.PromiseResult = null

        this.callback = []
        const self = this
        function resolve(data){
            if(self.PromiseState !== 'pending') return

            self.PromiseState = 'fulfilled'
            self.PromiseResult = data

            setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onResolved(data)
            })
            })
        }

        function reject(data){
            if(self.PromiseState !== 'pending') return

            self.PromiseState = 'rejected'
            self.PromiseResult = data
            
            setTimeout(() => {
                self.callbacks.forEach(item =>{
                    item.onRejected(data)
                })
            })
            
        }
        try{
            executor(resolve,reject)
        }catch(e){
            reject(e)
        }
    }

then(onResolved,onRejected){
    const self = this
    if(typeof onRejected !== 'function'){
        onRejected = reason => {
            throw reason
        }
    }
    if(typeof onResolved !== 'function'){
        onResolved = value => value
        // value => {return value}
    }
    return new Promise((resolve,reject) => {
        function callback(type){
            try{
                let result = type(self.PromiseResult)
                if(result instanceof Promise){
                    result.then(v => {
                        resolve(v)
                    }, r=>{
                        reject(r)
                    })
                }else{
                    resolve(result)
                }
            }catch(e){
                reject(e)
            }
        }
        if(this.PromiseState === 'fulfilled'){
            setTimeout(() => {
                callback(onResolved)
            })
        }
        if(this.PromiseState === 'rejected'){
           setTimeout(() => {
            callback(onRejected)
           })
        }
    
        if(this.PromiseState === 'pending'){
            this.callback.push ({
                onResolved: function(){
                  callback(onResolved)
                },
                onRejected: function(){
                 callback(onRejected)
                }
            })
        }
    })  
}

catch(onRejected){
    return this.then(undefined, onRejected)
}

static resolve(value){
    return new Promise((resolve,reject) => {
        if(value instanceof Promise){
            value.then(v =>{
                resolve(v)
            }, r =>{
                reject(r)
            })
        }else{
            resolve(value)
        }
    })
}

static reject(reason){
    return new Promise((resolve,reject) => {
        reject(reason)
    })
}

static all(promise){
    return new Promise((resolve,reject) => {
        let count = 0;
        let arr = [];
        for(let i = 0;i< promises.length;i++){

            promises[i].then(v => {
                count++;
                arr[i] = v

                if(count === promises.length){
                    resolve(v)
                }
            }, r => {
                reject(v)
            })
        }
    })
}

static race (promises){
    return new Promise((resolve, reject) => {
        for(let i=0;i<promises.length;i++){
            promises[i].then(v => {
                //修改返回对象的状态为 『成功』
                resolve(v);
            },r=>{
                //修改返回对象的状态为 『失败』
                reject(r);
            })
        }
    });
}
}
