const a = [1, 23, 4, 5, 6, 7];

function copy(arr: number[]) {
  return [...arr];
}
function insert(data: number[], index: number, value: number) {
  const b = [...data,0];
  console.log(b[33]);
  if (index < 0) {
    b.unshift(value);
  } else if (index >= b.length) {
    b.push(value);
  } else {
    
    for (let i = 0; i < b.length; i++) {
      if (i !== index) continue;
console.log(i)
console.log(data);
      for (let j = i + 1; j <= data.length; j++) {
        // console.log(j);
        b[j] = b[j - 1];
      }
      b[i] = value;
    }
  }
  return b;
}

console.log(insert(a, 2, 100));
