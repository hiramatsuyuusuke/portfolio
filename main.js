

const sleep = (msec) => new Promise(resolve => setTimeout(resolve, msec));

const drawTextAsync = async () => {

    const canvas = document.getElementById("canvas");
    canvas.style.backgroundColor = 'white'; 
    canvas.style.color = 'black'
    canvas.style.position = 'absolute'
    canvas.style.top = '100px';
    canvas.style.left = '150px';
    canvas.innerHTML = "　";
    await sleep(100);
    const word = "22222222";
    for (var i = 0; i < word.length; i++) {
        const content = word.substr(0, i+1);
        canvas.innerHTML = content;
        await sleep(100);
    }
    canvas.style.backgroundColor = 'navy'; 
    canvas.style.color = 'white'

}

