$(document).ready(function(){
	"use strict";

        /*==================================
* Author        : "ThemeSine"
* Template Name : Khanas HTML Template
* Version       : 1.0
==================================== */



/*=========== TABLE OF CONTENTS ===========
1. Scroll To Top 
2. Smooth Scroll spy
3. Progress-bar
4. owl carousel
5. welcome animation support
======================================*/

    // 1. Scroll To Top 
    $(window).on('scroll',function () {
    	if ($(this).scrollTop() > 600) {
    		$('.return-to-top').fadeIn();
    	} else {
    		$('.return-to-top').fadeOut();
    	}
    });
    $('.return-to-top').on('click',function(){
    	$('html, body').animate({
    		scrollTop: 0
    	}, 1500);
    	return false;
    });


    $(document).ready(function() {

    	function doSetTimeout(data, key) {
    		setTimeout(function() { 
    			var html = "<tr class='details'>";
    			html += "<td class='contents'>"+ data[key].ifsc + "</td>";
    			html += "<td class='contents'>"+ data[key].bank_name + "</td>";
    			html += "<td class='contents'>"+ data[key].branch + "</td>";
    			html += "<td class='contents'>"+ data[key].address + "</td>";
    			html += "<td class='contents'>"+ data[key].city + "</td>";
    			html += "<td class='contents'>"+ data[key].district + "</td>";
    			html += "<td class='contents'>"+ data[key].state + "</td>";
    			html += "</tr>";
    			$(html).appendTo("#banks tbody");
    		}, 100);
    	}
    	function spinner(val) {
    		if(val == 'show') {

    			$(".spinner").removeClass('hidden');
    		} else {

    			$(".spinner").addClass('hidden');
    		}
    	}
    	var url = "https://vast-shore-74260.herokuapp.com/banks";
    	$("#city").on('change', function() {
    		$(".search").html("");
    		spinner('show');
    		var dataString = "city="+ $(this).val();
    		$.ajax({
    			method : 'GET',
    			data : dataString,
    			url : url,
    			success : function(data) {
    				var blueprint = $("#banks tbody tr").first();
    				for (var key in data) {
    					doSetTimeout(data, key);
    				}
    				$(".bank-container").removeClass('hidden');

    				spinner('hide');
    			},
    			error : function(err) {
    				console.log(err);
    				$(".error").html("Something went wrong. Try again later");
    			}
    		});
    	});

    	var searchCard = function(e) {
    		e.preventDefault();
    		var filter = this.value.toUpperCase();
    		var card = document.getElementsByClassName('tbody')[0];
    		card = card.getElementsByClassName('details');
    		Array.from(card).forEach(function(elem) {
    			if(elem.innerHTML.toUpperCase().indexOf(filter) > -1) {
    				elem.style.display = "";
    			} else {
    				elem.style.display = "none";
    			}
    		});
    	}
    	document.getElementsByClassName('search')[0].addEventListener('keyup', searchCard);
    });
	// 4. owl carousel
	
    // 5. welcome animation support

    $(window).load(function(){
    	$(".header-text h2,.header-text p").removeClass("animated fadeInUp").css({'opacity':'0'});
    	$(".header-text a").removeClass("animated fadeInDown").css({'opacity':'0'});
    });

    $(window).load(function(){
    	$(".header-text h2,.header-text p").addClass("animated fadeInUp").css({'opacity':'0'});
    	$(".header-text a").addClass("animated fadeInDown").css({'opacity':'0'});
    });

});	
