class HashTable {
    // size is array size to store key value - keyMap (converted to number)
    // weirdPrime for making it different
    constructor(size = 53, options = {}){
      this.keyMap = new Array(size);
      this.weirdPrime = options.weirdPrime || 31;
      this.maxKeyLength = options.maxKeyLength || 100;
    }
    // convert key to number which is in range: 0..size
    // maximum length is 100 characters of key
    _hash(key) {
      let total = 0;
      for (let i = 0; i < Math.min(key.length, this.maxKeyLength); i++) {
        let value = key[i].charCodeAt(0);
        total = (total * this.weirdPrime + value)
      }
      total = total % this.keyMap.length;
      return total;
    }

    // we use another array for separate chain (same index)
    set(key,value){
      let index = this._hash(key);
      if(!this.keyMap[index]){
        this.keyMap[index] = [];
      }
      this.keyMap[index].push([key, value]);
    }

    // get key correspoding with the sort of separate chain
    get(key){
      let index = this._hash(key);
      if(this.keyMap[index]){
        for(let i = 0; i < this.keyMap[index].length; i++){
          if(this.keyMap[index][i][0] === key) {
            return this.keyMap[index][i][1]
          }
        }
      }
      return undefined;
    }

    // get collection of keys
    keys(){
      let keysArr = [];
      for(let i = 0; i < this.keyMap.length; i++){
        if(this.keyMap[i]){
          for(let j = 0; j < this.keyMap[i].length; j++){
            if(!keysArr.includes(this.keyMap[i][j][0])){
              keysArr.push(this.keyMap[i][j][0])
            }
          }
        }
      }
      return keysArr;
    }

    // get collection of values
    values(){
      let valuesArr = [];
      for(let i = 0; i < this.keyMap.length; i++){
        if(this.keyMap[i]){
          for(let j = 0; j < this.keyMap[i].length; j++){
            if(!valuesArr.includes(this.keyMap[i][j][1])){
              valuesArr.push(this.keyMap[i][j][1])
            }
          }
        }
      }
      return valuesArr;
    }
  }
  
  let ht = new HashTable(17);
  ht.set("maroon","#800000")
  ht.set("yellow","#FFFF00")
  ht.set("olive","#808000")
  ht.set("salmon","#FA8072")
  ht.set("lightcoral","#F08080")
  ht.set("mediumvioletred","#C71585")
  ht.set("plum","#DDA0DD")
  ht.set("purple","#DDA0DD")
  ht.set("violet","#DDA0DD")
  
  
  ht.keys().forEach(function(key){
    console.log(ht.get(key));
  })

  console.log("keyMap: ", ht.keyMap);
  console.log("values: ", ht.values());

  // #808000
  // #DDA0DD
  // #FA8072
  // #DDA0DD
  // #C71585
  // #DDA0DD
  // #800000
  // #FFFF00
  // #F08080
  // keyMap:  [ <1 empty item>,
  //   [ [ 'olive', '#808000' ], [ 'plum', '#DDA0DD' ] ],
  //   <5 empty items>,
  //   [ [ 'salmon', '#FA8072' ] ],
  //   [ [ 'violet', '#DDA0DD' ] ],
  //   <2 empty items>,
  //   [ [ 'mediumvioletred', '#C71585' ], [ 'purple', '#DDA0DD' ] ],
  //   [ [ 'maroon', '#800000' ], [ 'yellow', '#FFFF00' ] ],
  //   <2 empty items>,
  //   [ [ 'lightcoral', '#F08080' ] ],
  //   <1 empty item> ]
  // values:  [ '#808000',
  //   '#DDA0DD',
  //   '#FA8072',
  //   '#C71585',
  //   '#800000',
  //   '#FFFF00',
  //   '#F08080' ]