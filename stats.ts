function readAllNumbers() : number[] {
    let textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    let lines : string[] = textArea.value.split("\n");
    let numbers : number[] = [];

    //Step 4: update to handle multiple numbers on one line

    for (let i = 0; i < lines.length; i++){
        let line = lines[i].split(" ")
        for (let n = 0; n < line.length; n++) {
            if(line[n] === "")
                continue;
            let num = Number(line[n]);
            if (isNaN(num))
                continue;
            numbers.push(num);
        }
    }
    return numbers;
}

function getMean( nums  : number[]) : number {
    let sum = 0;
    for (const n of nums){
        sum += n;
    }
    return sum / nums.length;
}

function getAboveBelowMean(nums : number[]) : [number, number] {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums){
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}

// PART A : Basic Stats

function getMedian(nums : number[]) : number {
    if (nums.length % 2 == 1) {  // if odd number of items
        return nums[(nums.length-1) / 2]
    }else { // if even number of items
        let floor = nums[(nums.length / 2) - 1]
        let ceil = nums[(nums.length / 2)]
        return (floor + ceil) / 2
    }
}

function getMinMax(nums : number[]) : [number, number] {
    //Step 2
    return [nums[0], nums[nums.length-1]]
}

function getStdDev(nums : number[]) : number {
    let total :number = 0
    for (let n of nums) {
        n  = Math.abs(n-getMean(nums)) // find the difference between the number and the mean
        n = n ** 2 // square each number
        total += n
    }
    total /= nums.length // gets the mean of the total
    total = total ** 0.5 // square roots the total
    return Number(total.toFixed(2))
}

let basicStatsAnalyzeButton = document.querySelector("button#analyze") as HTMLButtonElement;
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#mean") as HTMLElement).textContent = `${getMean(numbers)}`;    
    (document.querySelector("#aboveBelow") as HTMLElement).textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    (document.querySelector("#median") as HTMLElement).textContent = `${getMedian(numbers)}`;
    (document.querySelector("#minMax") as HTMLElement).textContent = `${getMinMax(numbers).join(" & ")}`;
    (document.querySelector("#stdDev") as HTMLElement).textContent = `${getStdDev(numbers)}`;
});

// PART B: Advanced Integer Stats

function getLeastCommonMultiple(nums : number[]) : number {
    let lcm :number = nums[nums.length-1]-1;
    let work :boolean = false;
    while (!work) {
        lcm++;
        for (const n of nums) {
            let dividedNum = lcm/n
            if (dividedNum % 1 === 0) {
                work = true;
            }else {
                work = false;
                break;
            }
        }
    }
    return lcm;
}

function getAllCommonFactors(nums : number[]) : number[] {
    let commonFactors :number[] = [];
    let commonFactor = nums[0];
    let work :boolean = true;
    while (commonFactor >= 1) {
        for (const n of nums) {
            if ((n / commonFactor) % 1 == 0) {
                work = true;
            }else {
                work = false;
                break;
            }
        }
        if (work) {
            commonFactors.push(commonFactor)
        }
        commonFactor--;
    }
    return commonFactors
}

let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced") as HTMLButtonElement;
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#lcm") as HTMLElement).textContent = `${getLeastCommonMultiple(numbers)}`;
    (document.querySelector("#factors") as HTMLElement).textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
