
//ボタン連打無効用フラッグ
let run_flag = 0;

/*ちらつき防止のため、先にデータを読み込んでおく*/
//html側のIDを取得する
const canvas = document.getElementById("canvas");
canvas.style.position = 'absolute';
canvas.style.top = '120px';
canvas.style.left = '150px';  
//canvas.style.display = block;		
//canvas.style.width = 500 + "px"; 
//canvas.style.height = 500 + "px";	
for (var i = 1; i < 11; i++) {
    const content = '<img src="images_tmp/test_test' + i + '.jpg" >';        
    canvas.innerHTML = content;
}

/*非同期処理を開始*/
const sleep = (msec) => new Promise(resolve => setTimeout(resolve, msec));

const drawTextAsync = async () => {

    if(run_flag == 0){//ボタン連打無効用フラッグ
        run_flag = 1;//ボタン連打無効用フラッグ

        canvas.style.backgroundColor = 'white';    
        canvas.innerHTML = '<img src="images_tmp/test_test1.jpg" >';

        await sleep(100);

        for (var i = 1; i < 11; i++) {

            //canvas.style.left = 150 + (i * 10) + 'px';
            canvas.style.left = 150 + 'px';

            //const content = "img";
            const content = '<img src="images_tmp/test_test' + i + '.jpg" >';        
            canvas.innerHTML = content;

            await sleep(100);
        }
 
        run_flag = 0;//ボタン連打無効用フラッグ
    }
    
}

