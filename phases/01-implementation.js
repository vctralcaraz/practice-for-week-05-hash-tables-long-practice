class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here

    if((this.count + 1) / this.capacity > 0.7){
      this.resize();
    }

    const index = this.hashMod(key);

    if(this.data[index] !== null) {
      let head = this.data[index];

      while(true) {
        if(head.key === key){
          head.value = value;
          break;
        }

        if(head.next) {
          head = head.next;
        } else {
          head = this.data[index];

          this.data[index] = new KeyValuePair(key, value);
          this.count++;
          this.data[index].next = head;

          break;
        }
      }

    } else {
      this.data[index] = new KeyValuePair(key, value);
      this.count++;
    }
  }


  read(key) {
    // Your code here
    const index = this.hashMod(key);

    if(this.data[index] === null) {
      return undefined;
    } else {
      let head = this.data[index];

      while(true) {
        if(head.key === key) {
          return head.value;
        }

        if(!head.next) {
          return undefined;
        } else {
          head = head.next;
        }
      }
    }
  }


  resize() {
    // Your code here
    const oldData = this.data;
    this.count = 0;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);

    for(let i = 0; i < this.capacity / 2; i++) {
      let bucket = oldData[i];

      if(bucket !== null) {
        while(true) {
          this.insert(bucket.key, bucket.value);

          if(bucket.next === null) break;

          bucket = bucket.next;
        }
      }
    }
  }


  delete(key) {
    // Your code here
    const index = this.hashMod(key);

    if(this.data[index] !== null) {
      let head = this.data[index];

      while(true) {
        if(head.key === key){
          this.data[index] = head.next;
          this.count--;
          break;
        }

        if(head.next === null) return 'Key not found';

        if(head.next.key === key) {
          if(head.next.next !== null) {
            head.next = head.next.next;
          } else {
            head.next = null;
          }

          this.count--;
          break;
        }

        
        head = head.next;

        // if(head.next) {
        //   head = head.next;
        // } else {
        //   head = this.data[index];

        //   this.data[index] = new KeyValuePair(key, value);
        //   this.count++;
        //   this.data[index].next = head;

        //   break;
        // }
      }
    } else {
      return 'Key not found';
    }
  }
}


module.exports = HashTable;