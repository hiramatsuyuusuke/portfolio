
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="Portfolio_discussion_page.css">
    <title>Portfolio discussion</title>
</head>
<body>

    <!-- ヘッダー画像 -->
    <div id="header">
        <h1><img src="logo.png" alt="portfolio"></h1>
    </div>

    <!--ページの見出し-->
    <h2>Discussion</h2>

    <form method="post" action="Portfolio_discussion_page.php?status=1" style="margin-left:20px">
        <h4>
        お名前<br>
        <!--送信側で内容確認する-->
        <input type="text" size="10" name="onamae" id="onamae" required>
        </h4>
        <h4>
        コメント内容<br>
        <!--送信側で内容確認する-->
        <textarea name="naiyou" cols="40" rows="5" required></textarea>
        </h4>
        <p><input type="submit" value="コメントする"></p>
    </form>
    
    

    <?php
    //////////////ここからPHP////////////
    
    //データベースに接続
    $dsn = 'mysql:dbname=test;host=localhost;charset=utf8mb4';
    $user = 'root';
    $password ='';
    $dbh = new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    
    //データベースとテーブルを選択しアクセス
    $sql = 'SELECT * FROM portfolio_discussion1.comments WHERE 1';
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    
    $id_no = 1000;
    //データベースからデータを取得
    while(1){
        $rec = $stmt->fetch(PDO::FETCH_ASSOC);
        if($rec==false) break;
        $id_no = $rec['id'];//最後の行のid番号
    }
    
  
    $id_no += 1;
    //コメントを削除するときに参照するidのURLパラメータ
    $r_link_url ="Portfolio_discussion_page.php?status=".$id_no."";
    //日付を取得
    $date_t = date('Y-m-d');

    //formからの送信があったとき
    if(isset($_POST["naiyou"] )==true){
        
        $naiyou = $_POST["naiyou"];
        $onamae = $_POST["onamae"];
        //データベースに追加するデータをhtmlタグの形にする
        $remove_link = "<a href=" .$r_link_url.">コメントを削除する</a>";

        
        //URLのstatusパラメータが設定されているとき
        if(isset($_GET['status'] )==true){
            
            //コメントボタンが押された時。URLのstatusパラメータが1のとき.
            if($_GET['status'] == 1){
                //データの挿入
                $sql = 'INSERT INTO portfolio_discussion1.comments (id, name, text, remove_comment, date_time) 
                VALUES("'.$id_no.'" , "'.$onamae.'" , "'.$naiyou.'" , "'.$remove_link.'" , "'.$date_t.'" )';
                //print $sql.'<br>';
                $stmt = $dbh->prepare($sql);
                $stmt->execute();
            }
        }
    }
    
    //コメントの削除リンク
    //URLのstatusパラメータが設定されているとき
    if(isset($_GET['status'] )==true){
        //URLのstatusパラメータがコメントの削除リンクのとき 
        if($_GET['status'] >= 1000){
            //データベースのデータを削除
            $sql = 'DELETE FROM portfolio_discussion1.comments WHERE id='.$_GET['status'].'';
            $stmt = $dbh->prepare($sql);
            $stmt->execute();
        }
    }
    
    
    //データベースとテーブルの選択。順番id降順。
    $sql = 'SELECT * FROM portfolio_discussion1.comments ORDER BY id DESC';
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    
    //データの表示
    while(1){
        $rec = $stmt->fetch(PDO::FETCH_ASSOC);
        if($rec==false) break;
        print '<div id=comment_items><h5>名前 : ' .$rec['name']. '. 　順番 : ' .$rec['id']. '. 　日付 : ' .$rec['date_time']. '</h5>';
        print '<p id=comment_text>' .$rec['text']. '</p>';
        print '<p id=comment_remove>' .$rec['remove_comment'].'</p></div>';
    }
    
    ?>
    
    
    <!-- javascript URLをパラメータのないURLにする -->
    <script>history.replaceState('','','Portfolio_discussion_page.php');</script>


</body>
</html>


