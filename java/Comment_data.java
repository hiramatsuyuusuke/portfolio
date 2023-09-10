package com.example.demo.controller;

public class Comment_data{

	  private final int id;
	  private final String name;
	  private final String text;
	  private final String date;

	  
	  public Comment_data(int id, String name, String text, String date) {
		    this.id = id;
		    this.name = name;
		    this.text = text;
		    this.date = date;		
		    
	  }	  
	  
	  public int getId() {
	    return id;
	  }

	  public String getName() {
	    return name;
	  }

	  public String getText() {
	    return text;
	  }	
	  
	  public String getDate() {
		    return date;
	  }		  

	
}
