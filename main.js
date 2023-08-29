

/*====================================
走行シミュレータの処理
======================================*/
let robo_icon = 2;

let array_field = new Array(64);  
let array0 = new Array(8); 
let array1 = new Array(8); 
let array2 = new Array(8); 
let array3 = new Array(8); 
let array4 = new Array(8); 
let array5 = new Array(8); 
let array6 = new Array(8); 
let array7 = new Array(8); 

let pos_x = 7;
let pos_y = 7;

//フィールドのデータ
array_field = [ 0,0,0,0,0,0,0,0,
                1,0,0,0,0,0,0,0,
                1,0,0,0,0,0,0,0,
                1,0,0,1,1,1,1,1,
                0,0,0,0,0,0,0,0,
                1,1,1,1,1,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0];

//ロボットの初期ポジション
pos_cur = pos_y * 8 + pos_x;
array_field[pos_cur] = robo_icon;

//フィールドとポジションのデータをセット
for (let j = 0; j < 8; j++) {
    array0[j] = array_field[j];
    array1[j] = array_field[j + 8];     
    array2[j] = array_field[j + 16];                  
    array3[j] = array_field[j + 24];   
    array4[j] = array_field[j + 32];   
    array5[j] = array_field[j + 40];   
    array6[j] = array_field[j + 48];   
    array7[j] = array_field[j + 56];                       
}

//html側のIDに、フィールドとポジションのデータを送る
window.onload = function onLoad() {
    target0 = document.getElementById("test_output0");
    target1 = document.getElementById("test_output1");
    target2 = document.getElementById("test_output2");
    target3 = document.getElementById("test_output3");
    target4 = document.getElementById("test_output4");
    target5 = document.getElementById("test_output5");
    target6 = document.getElementById("test_output6");
    target7 = document.getElementById("test_output7");

    //target0.innerHTML = '<img src="images/Cpp_logo.png">';
    target0.innerHTML = array0;     
    target1.innerHTML = array1;         
    target2.innerHTML = array2;  
    target3.innerHTML = array3;  
    target4.innerHTML = array4;  
    target5.innerHTML = array5;  
    target6.innerHTML = array6;   
    target7.innerHTML = array7;                   
}



/*=====================================
画像描画処理
=======================================*/
//ボタン連打無効用フラッグ
let run_flag = 0;

/*ちらつき防止のため、先にデータを読み込んでおく*/
//html側のIDを取得する
const canvas = document.getElementById("canvas");
for (var i = 0; i < 10; i++) {
    const content = '<img src="images_tmp/test_test' +
     i + '.jpg"  id="view" alt="image">';            
    canvas.innerHTML = content;
}


/*非同期処理を開始*/
const sleep = (msec) => new Promise(resolve => setTimeout(resolve, msec));

const drawTextAsync = async () => {

    if(run_flag == 0){//ボタン連打無効用フラッグ
        run_flag = 1;//ボタン連打無効用フラッグ

        /*====================================
        走行シミュレータの処理
        ======================================*/
        pos_y = 7;
        for (let time_loop = 0; time_loop < 8; time_loop++) {
       
            //ポジションアイコンのクリア
            array_field[pos_cur] = 0;
        
            //ポジションの取得
            pos_cur = pos_y * 8 + pos_x;
            array_field[pos_cur] = robo_icon;
        
            //フィールドとポジションデータの更新
            for (let j = 0; j < 8; j++) {
                array0[j] = array_field[j];
                array1[j] = array_field[j + 8];     
                array2[j] = array_field[j + 16];                  
                array3[j] = array_field[j + 24];   
                array4[j] = array_field[j + 32];   
                array5[j] = array_field[j + 40];   
                array6[j] = array_field[j + 48];   
                array7[j] = array_field[j + 56];                       
            }
            
            //html側のIDに、ポジションデータを送る
            //target0.innerHTML = '<img src="images/Cpp_logo.png">';
            target0.innerHTML = array0;     
            target1.innerHTML = array1;         
            target2.innerHTML = array2;  
            target3.innerHTML = array3;  
            target4.innerHTML = array4;  
            target5.innerHTML = array5;  
            target6.innerHTML = array6;   
            target7.innerHTML = array7; 

            //ポジション座標の更新
            pos_y -= 1

            /*=====================================
            画像描画処理
            =======================================*/
            //canvas.style.backgroundColor = 'white';    
            //canvas.style.left = 150 + (i * 10) + 'px';
            //canvas.style.left = 200 + 'px';
            //const content = "img";
            const content = '<img src="images_tmp/test_test' +
             time_loop + '.jpg" id="view" alt="image">';      
            canvas.innerHTML = content;

            await sleep(100);
        }
 
        run_flag = 0;//ボタン連打無効用フラッグ
    }
    
}

