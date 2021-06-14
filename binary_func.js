 // binary search algo to find the number in as few guesses as possible (thanks youTube!)
 const binary = (val, arr) => {
    let lower = min;
    let upper = max;

    console.log(lower + " " + upper + " line 35");

    while (lower <= upper) {
      const middle = lower + Math.floor((max - min) / 2);
      console.log(middle + " line 39");
      if (val === arr[middle]) {
        return middle;
      }

      if (val < arr[middle]) {
        upper = middle - 1;
      } else {
        lower = middle + 1;
      }
    }
  };
  console.log(binary + " line 49");


  //