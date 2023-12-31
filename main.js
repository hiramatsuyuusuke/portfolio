
/*====================================
SVMの認識結果を取得する
======================================*/
let array_SVM_n = new Array(64);  
let array_SVM_e = new Array(64);  
let array_SVM_s = new Array(64);  
let array_SVM_w = new Array(64);  

							
//SVMの画像認識結果。train_feild1, test_feild1, C=100, score=1.0.
array_SVM_n = [ 0,0,0,0,0,0,0,0,
                0,0,1,0,0,1,1,1,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                1,0,0,1,1,1,1,1,
                0,0,0,0,0,0,0,0,
                1,1,1,1,1,0,0,0,
                0,0,0,0,0,0,0,0];

array_SVM_e = [ 0,1,0,0,1,1,1,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,1,1,1,1,1,0,
                0,0,0,0,0,0,0,0,
                1,1,1,1,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0];

array_SVM_s = [ 0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                1,0,0,1,1,1,1,1,
                0,0,0,0,0,0,0,0,
                1,1,1,1,1,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0];

array_SVM_w = [ 0,0,0,1,0,0,1,1,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,1,0,0,1,1,1,1,
                0,0,0,0,0,0,0,0,
                0,1,1,1,1,1,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0];   


/*====================================
走行シミュレータの処理
======================================*/
let test_loop;
let robo_icon = 2;

let array_field = new Array(64); 
let potential_energy = new Array(64); 


let array0 = new Array(8); 
let array1 = new Array(8); 
let array2 = new Array(8); 
let array3 = new Array(8); 
let array4 = new Array(8); 
let array5 = new Array(8); 
let array6 = new Array(8); 
let array7 = new Array(8); 

let pos_x;
let pos_y;
let pos_cur;
let pos_n_next, pos_e_next, pos_s_next, pos_w_next;
let pos_n_flag, pos_e_flag, pos_s_flag, pos_w_flag;
let potential_energy_max;
let pe;

//フィールドの障害物データ
array_field = [ 0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0];

//フィールドの位置エネルギーの初期化
pe = 9999;
potential_energy = [pe,pe,pe,pe,pe,pe,pe,pe,
                    pe,pe,pe,pe,pe,pe,pe,pe,
                    pe,pe,pe,pe,pe,pe,pe,pe,
                    pe,pe,pe,pe,pe,pe,pe,pe,
                    pe,pe,pe,pe,pe,pe,pe,pe,
                    pe,pe,pe,pe,pe,pe,pe,pe,
                    pe,pe,pe,pe,pe,pe,pe,pe,
                    pe,pe,pe,pe,pe,pe,pe,pe,];

            
            
//ロボットの初期ポジション
pos_x = 7;
pos_y = 7;
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
/*
//html側のIDに、フィールドとポジションのデータを送る
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
*/


//html側のIDを取得する.
const ode_camera = document.getElementById("ode_camera");
for (var i = 0; i < 63; i++) {
    const content = '<img src="images_tmp/test' +
    i + '.jpg"  id="ode_camera" alt="image">';            
    ode_camera.innerHTML = content;
}
/*先にデータを読み込んでおく*/
//html側のIDを取得する
//north
const ode_camera2_n = document.getElementById("ode_camera2_n");
for (var i = 0; i < 63; i++) {
    const content = '<img src="images_tmp/test_n' +
    i + '.jpg"  id="ode_camera2" alt="image">';            
    ode_camera2_n.innerHTML = content;
}
//east
const ode_camera2_e = document.getElementById("ode_camera2_e");
for (var i = 0; i < 63; i++) {
    const content = '<img src="images_tmp/test_e' +
    i + '.jpg"  id="ode_camera2" alt="image">';            
    ode_camera2_e.innerHTML = content;
}
//south
const ode_camera2_s = document.getElementById("ode_camera2_s");
for (var i = 0; i < 63; i++) {
    const content = '<img src="images_tmp/test_s' +
    i + '.jpg"  id="ode_camera2" alt="image">';            
    ode_camera2_s.innerHTML = content;
}
//west
const ode_camera2_w = document.getElementById("ode_camera2_w");
for (var i = 0; i < 63; i++) {
    const content = '<img src="images_tmp/test_w' +
    i + '.jpg"  id="ode_camera2" alt="image">';            
    ode_camera2_w.innerHTML = content;
}



/*=====================================
画像描画処理
=======================================*/
//ボタン連打無効用フラッグ
let run_flag = 0;

/*非同期処理を開始*/
const sleep = (msec) => new Promise(resolve => setTimeout(resolve, msec));

const drawTextAsync = async () => {

    if(run_flag == 0){//ボタン連打無効用フラッグ
        run_flag = 1;//ボタン連打無効用フラッグ

        /*====================================
        走行シミュレータの処理
        ======================================*/
        //スタート位置
        pos_x = 7;
        pos_y = 7;

        //フィールドの初期化
        array_field = [ 0,0,1,0,0,1,1,1,
                        0,0,0,0,0,0,0,0,
                        1,0,0,0,0,0,0,0,
                        0,0,0,1,1,1,1,1,
                        0,0,0,0,0,0,0,0,
                        1,1,1,1,1,0,0,0,
                        0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0];
        //フィールドの位置エネルギーの初期化
        pe = 999;
        potential_energy = [pe,pe,pe,pe,pe,pe,pe,pe,
                            pe,pe,pe,pe,pe,pe,pe,pe,
                            pe,pe,pe,pe,pe,pe,pe,pe,
                            pe,pe,pe,pe,pe,pe,pe,pe,
                            pe,pe,pe,pe,pe,pe,pe,pe,
                            pe,pe,pe,pe,pe,pe,pe,pe,
                            pe,pe,pe,pe,pe,pe,pe,pe,
                            pe,pe,pe,pe,pe,pe,pe,pe,];

        //描画キャンバスの設定
        var canvas = document.getElementById('sample');
        if (canvas.getContext){
            var context = canvas.getContext('2d');
            context.clearRect(0,0,200,150);                    
            //時間経過のステップ
            for (let time_loop = 0; time_loop < 100; time_loop++) {

                if(pos_x == 0 && pos_y ==0){
                    break;
                }
        
                //現在ポジションの取得
                pos_cur = pos_y * 8 + pos_x;
                array_field[pos_cur] = robo_icon;
                //現在ポジションのアイコンのクリア
                array_field[pos_cur] = 0;            
                //位置エネルギーを-1する
                potential_energy[pos_cur] -= 1;
    


                //東西南北の一次元フィールド座標を計算
                pos_w_next = pos_y * 8 + (pos_x - 1);  
                pos_s_next = (pos_y + 1) * 8 + pos_x;    
                pos_e_next = pos_y * 8 + (pos_x + 1);  
                pos_n_next = (pos_y - 1) * 8 + pos_x;   



                //描画内容
                context.fillStyle = 'rgb(255,255,255)'; //塗りつぶしの色は白
                //左からpos_x*20上から(pos_y - 1)*20の位置に、幅20高さ10の四角形を描く
                context.fillRect( pos_x*20, (pos_y)*20, 10, 10);
                context.fillStyle = 'rgb(255,0,0)'; //塗りつぶしの色は黒

                //次に移動するマスの座標を判定
                //西の座標を判定            
                pos_w_flag = 0;
                if(0 <= pos_x - 1){ //次の座標がフィールド内であるとき
                    
                //  if(array_field[pos_w_next] == 0){ //次のフィールドに障害物がないとき西の座標を有効にする
                    if(array_SVM_w[pos_cur] == 0){    //次のフィールドに障害物がないと認識したとき,西の座標を有効にする。SVMは「現在」ポジションから周囲の障害物認識を行う。          
                        pos_w_flag = 1;
                    }
                    else{ 
                        //描画内容
                        //
                        context.fillRect( (pos_x - 1)*20 + 10, (pos_y)*20, 5, 15);
                    }                    
                }
                //南の座標を判定
                pos_s_flag = 0;           
                if(pos_y + 1 <= 7){  //次の座標がフィールド内であるとき
                    
                //  if(array_field[pos_s_next] == 0){//次のフィールドに障害物がないとき南の座標を有効にする       
                    if(array_SVM_s[pos_cur] == 0){    //次のフィールドに障害物がないと認識したとき,南の座標を有効にする。SVMは「現在」ポジションから周囲の障害物認識を行う。                                 
                        pos_s_flag = 1;            
                    }
                    else{ 
                        //描画内容
                        //
                        context.fillRect( (pos_x)*20, (pos_y+1)*20, 15, 5);
                    }                       
                }
                //東の座標を判定
                pos_e_flag = 0;             
                if(pos_x + 1 <= 7){ //次の座標がフィールド内であるとき    
                    
                //    if(array_field[pos_e_next] == 0){//次のフィールドに障害物がないとき東の座標を有効にする
                    if(array_SVM_e[pos_cur] == 0){    //次のフィールドに障害物がないと認識したとき,東の座標を有効にする。SVMは「現在」ポジションから周囲の障害物認識を行う。                                  
                        pos_e_flag = 1;                 
                    }
                    else{
                        //描画内容
                        //
                        context.fillRect( (pos_x + 1)*20, (pos_y)*20, 5, 15);
                    }                      
                }
                //北の座標を判定
                pos_n_flag = 0;              
                if(0 <= pos_y - 1){ //次の座標がフィールド内であるとき   
                    
                //  if(array_field[pos_n_next] == 0){//次のフィールドに障害物がないとき北の座標を有効にする       
                    if(array_SVM_n[pos_cur] == 0){    //次のフィールドに障害物がないと認識したとき,北の座標を有効にする。SVMは「現在」ポジションから周囲の障害物認識を行う。                               
                        pos_n_flag = 1;                 
                    }
                    else{
                        //描画内容
                        //
                        context.fillRect( pos_x*20, (pos_y - 1)*20 + 10, 15, 5);
                    }                
                }   

       
                
                //東西南北の位置エネルギーをフラッグに取得。ただし、障害物がある方向の位置エネルギーは0とする。
                if( pos_n_flag == 1)
                {
                    pos_n_flag = potential_energy[pos_n_next];
                }
                if( pos_e_flag == 1)
                {
                    pos_e_flag = potential_energy[pos_e_next];
                }
                if( pos_s_flag == 1)
                {
                    pos_s_flag = potential_energy[pos_s_next];
                }
                if( pos_w_flag == 1)
                {
                    pos_w_flag = potential_energy[pos_w_next];
                }

                //負の位置エネルギーが最も大きい方向を取得。
                potential_energy_max = 0;
                //西の位置エネルギーを判定
                if( pos_w_flag >= pos_n_flag && 
                    pos_w_flag >= pos_e_flag && 
                    pos_w_flag >= pos_s_flag )
                {
                    potential_energy_max = 4;
                }
                //南の位置エネルギーを判定
                if( pos_s_flag >= pos_n_flag && 
                    pos_s_flag >= pos_e_flag && 
                    pos_s_flag >= pos_w_flag )
                {
                    potential_energy_max = 3;
                }
                //東の位置エネルギーを判定
                if( pos_e_flag >= pos_n_flag && 
                    pos_e_flag >= pos_s_flag && 
                    pos_e_flag >= pos_w_flag )
                {
                    potential_energy_max = 2;
                }           
                //北の位置エネルギーを判定
                if( pos_n_flag >= pos_e_flag && 
                    pos_n_flag >= pos_s_flag && 
                    pos_n_flag >= pos_w_flag )
                {
                    potential_energy_max = 1;
                }


                //次に移動するマスの座標を取得
                //北に移動
                if( potential_energy_max == 1)
                {
                    pos_y -= 1;
                }
                //東に移動
                if( potential_energy_max == 2)
                {
                    pos_x += 1;
                }
                //南に移動
                if( potential_energy_max == 3)
                {
                    pos_y += 1;
                }
                //西に移動
                if( potential_energy_max == 4)
                {
                    pos_x -= 1;
                }

                //描画内容
                //左からpos_x*20上から(pos_y - 1)*20の位置に、幅20高さ10の四角形を描く
                context.fillStyle = 'rgb(0,255,0)'; //塗りつぶしの色は緑
                context.fillRect( pos_x*20, (pos_y)*20, 10, 10);  
            

                //1次元ポジションの更新
                pos_cur = pos_y * 8 + pos_x;
                //ポジションのアイコンを取得
                array_field[pos_cur] = robo_icon;


                //フィールドとポジションデータの更新
                for (let j = 0; j < 8; j++) {
                    
                    //位置データ
                    array0[j] = array_field[j];
                    array1[j] = array_field[j + 8];     
                    array2[j] = array_field[j + 16];                  
                    array3[j] = array_field[j + 24];   
                    array4[j] = array_field[j + 32];   
                    array5[j] = array_field[j + 40];   
                    array6[j] = array_field[j + 48];   
                    array7[j] = array_field[j + 56];
                    
                    /*
                    //位置エネルギーデータ
                    array0[j] = potential_energy[j];
                    array1[j] = potential_energy[j + 8];     
                    array2[j] = potential_energy[j + 16];                  
                    array3[j] = potential_energy[j + 24];   
                    array4[j] = potential_energy[j + 32];   
                    array5[j] = potential_energy[j + 40];   
                    array6[j] = potential_energy[j + 48];   
                    array7[j] = potential_energy[j + 56];   
                    */        
                }
                
                //html側のIDに、ポジションデータを送る
                //target0.innerHTML = '<img src="images/Cpp_logo.png">';
                /*
                target0.innerHTML = array0;     
                target1.innerHTML = array1;         
                target2.innerHTML = array2;  
                target3.innerHTML = array3;  
                target4.innerHTML = array4;  
                target5.innerHTML = array5;  
                target6.innerHTML = array6;   
                target7.innerHTML = array7; 
                */
                /*=====================================
                画像描画処理
                =======================================*/
                await sleep(250);           


                const content = '<img src="images_tmp/test' +
                pos_cur + '.jpg" id="ode_camera" alt="image">';      
                ode_camera.innerHTML = content;
                //north
                //if(potential_energy_max == 1){
                    const content2_n = '<img src="images_tmp/test_n' +
                    pos_cur + '.jpg" id="ode_camera2" alt="image">';      
                    ode_camera2_n.innerHTML = content2_n;           
                //}
                //east
                //if(potential_energy_max == 2){
                    const content2_e = '<img src="images_tmp/test_e' +
                    pos_cur + '.jpg" id="ode_camera2" alt="image">';      
                    ode_camera2_e.innerHTML = content2_e;           
                //}
                
                //south
                //if(potential_energy_max == 3){
                    const content2_s = '<img src="images_tmp/test_s' +
                    pos_cur + '.jpg" id="ode_camera2" alt="image">';      
                    ode_camera2_s.innerHTML = content2_s;           
                //}
                //west
                //if(potential_energy_max == 4){
                    const content2_w = '<img src="images_tmp/test_w' +
                    pos_cur + '.jpg" id="ode_camera2" alt="image">';      
                    ode_camera2_w.innerHTML = content2_w;           
                //}
                

            }
        }
        run_flag = 0;//ボタン連打無効用フラッグ
    }
    
}


