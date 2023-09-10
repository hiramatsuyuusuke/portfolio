package com.example.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HelloController {
	
	  
	@GetMapping(value="/index")
	//SQLをSELECTする。
	public String sample(Model model) {

		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		
		List<Comment_data> comments = new ArrayList<Comment_data>();

		
	    try {
	    	//データベース接続
	    	conn = DriverManager.getConnection(
	    			//ホスト名、データベース名
	    			"jdbc:mysql://localhost:3306/portfolio_discussion1",
	    			//ユーザー名
	    			"root",
	    			//パスワード
	    			""
	    			);
	    	//SQL文をセット
	    	stmt = conn.prepareStatement("SELECT * FROM comments ORDER BY id DESC");
	    	//SQL文を実行
	    	rs = stmt.executeQuery();
	    	
	    	//ループして1レコードづつ取得
	    	while(rs.next()) {
	    		int id	= rs.getInt("id");
	    		String name	= rs.getString("name");	  
	    		String text	= rs.getString("text");	
	    		String date	= rs.getString("date_time");	
	    		
	    	    Comment_data comment = new Comment_data(id, name, text, date);
	    	    comments.add(comment);	 
   	    	    
	    	}
	    }catch(SQLException e) {
	    	System.out.append("データベース接続エラー。");
	    	
	    }finally {
	    	try {
	    		if(conn != null) {
	    			conn.close();
	    		}
	    	}catch( SQLException e) {
	    		System.out.println("1データベース接続エラー。");
	    	}
	    }
	    
	   
	    model.addAttribute("comments", comments);

	    return "index";
	}
	
	
	
	
	
	@PostMapping(value="/index")	
	public String sample2(@ModelAttribute Form1 form1, @ModelAttribute Form2 form2, Model model) {
	
		//「コメントする」ボタンがクリックされたとき
		if(form1.getName()!=null && form1.getComment_text()!=null) {
		
			Connection conn = null;
			PreparedStatement stmt = null;	
			ResultSet rs = null;	
			int id = 0;
			
		    try {
		    	//データベース接続
		    	conn = DriverManager.getConnection(
		    			//ホスト名、データベース名
		    			"jdbc:mysql://localhost:3306/portfolio_discussion1",
		    			//ユーザー名
		    			"root",
		    			//パスワード
		    			""
		    			);
		    	
		    	//SQL文、SELECTをセット
		    	stmt = conn.prepareStatement("SELECT * FROM comments");
		    	//SQL文、SELECTを実行
		    	rs = stmt.executeQuery();
		    	
		    	//ループして1レコードづつ取得
		    	while(rs.next()) {
		    		id = rs.getInt("id");   			    		
		    	}
		    	//idを更新
		    	id += 1;
		    	
		    	//条件指定したSQL文をセット
		    	//既にデータベースにあるid(PK)の指定はエラー
		    	stmt = conn.prepareStatement("INSERT INTO comments (id, name, text, date_time) VALUES(?, ?, ?, ?)");
		    	
	
		    	// 1つ目の「?」に対してform1のid（数値）をセット
		    	stmt.setInt(1, id);	  
		    	// 2つ目の「?」に対してform1のnameをセット
		    	stmt.setString(2, form1.getName());	 	    	
		    	// 3つ目の「?」に対してform1のtextをセット
		    	stmt.setString(3, form1.getComment_text());
		    	
		    	//日付を取得
		    	Date now = new Date();
		    	//Dateフォーマットのオブジェクトを作成
		        SimpleDateFormat d2 = new SimpleDateFormat("yyyy年MM月dd日HH時mm分ss秒");
		        //Date型をString型に変換
		        String c2 = d2.format(now); 
		        // 4つ目の「?」に対してform1の日付をセット
		    	stmt.setString(4, c2);	
		    	
		
		    	//SQL文を実行
		    	stmt.executeUpdate();
	
		        
		    }catch(SQLException e) {
		    	System.out.append("データベース接続エラー。");
		    	
		    }finally {
		    	try {
		    		if(conn != null) {
		    			conn.close();
		    		}
		    	}catch( SQLException e) {
		    		System.out.println("1データベース接続エラー。");
		    	}
		    }		
	
			//SQLをSELECTする。
			sample(model);
				
		}
			
		
		
		//「コメントを削除する」ボタンがクリックされたとき
		if(form2.getRemove_id()!= null)
		{
	        System.out.println( form2.getRemove_id() );	
			Connection conn = null;
			PreparedStatement stmt = null;	
			int id = 0;
			
		    try {
		    	//データベース接続
		    	conn = DriverManager.getConnection(
		    			//ホスト名、データベース名
		    			"jdbc:mysql://localhost:3306/portfolio_discussion1",
		    			//ユーザー名
		    			"root",
		    			//パスワード
		    			""
		    			);
		    	
		    	//条件指定したSQL文をセット
		    	stmt = conn.prepareStatement("DELETE FROM comments WHERE id = ?");
		    	//String型を型に変換
		    	id = Integer.parseInt( form2.getRemove_id() );
		    	// 1つ目の「?」に対してform2のid（数値）をセット		    	
		    	stmt.setInt(1, id);	  

		    	
		    	//SQL文を実行
		    	stmt.executeUpdate();
	
		        
		    }catch(SQLException e) {
		    	System.out.append("データベース接続エラー。");
		    	
		    }finally {
		    	try {
		    		if(conn != null) {
		    			conn.close();
		    		}
		    	}catch( SQLException e) {
		    		System.out.println("1データベース接続エラー。");
		    	}
		    }			        
			//SQLをSELECTする。
			sample(model);	        
		}
		
		return "index";
	}
	
	

}